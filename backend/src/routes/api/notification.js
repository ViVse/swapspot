import { Router } from "express";
import { isValidObjectId } from "mongoose";
import requireJWTAuth from "../../middleware/requireJWTAuth.js";
import { notificationSchema } from "../../validators/notification-validator.js";
import Notificaton from "../../models/Notification.js";

const router = Router();

// GET api/notifications - get notifications
router.get("/", requireJWTAuth, async (req, res) => {
  const notifications = await Notificaton.find({ user: req.user._id });
  const unreadCount = await Notificaton.countDocuments({
    user: req.user._id,
    read: false,
  });
  res.send({ notifications, new: unreadCount });
});

// POST api/notifications - create notification
router.post("/", requireJWTAuth, async (req, res) => {
  const { error } = notificationSchema.validate(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  const { title, text, link } = req.body;

  const notification = await new Notificaton({
    user: req.user._id,
    title,
    text,
    link,
  });

  await notification.save();
  res.send(notification);
});

// PATCH api/notifications/read - mark all unread as read
router.patch("/read", requireJWTAuth, async (req, res) => {
  await Notificaton.updateMany(
    { user: req.user._id, read: false },
    { $set: { read: true } }
  );
  res.send("Updated");
});

// DELETE api/notifications/all - delete all notifications of a user
router.delete("/all", requireJWTAuth, async (req, res) => {
  try {
    await Notificaton.deleteMany({ user: req.user._id });
    res.send();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// DELETE api/notifications/:id - delete notification
router.delete("/:id", requireJWTAuth, async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).send({ message: "Not valid id" });
  }
  const notification = await Notificaton.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!notification)
    return res
      .status(404)
      .send({ message: "You do not have notification with such id" });

  try {
    await Notificaton.findByIdAndDelete(notification._id);
    res.send(notification);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: e.message });
  }
});

export default router;
