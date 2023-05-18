import { Router } from "express";
import { isValidObjectId } from "mongoose";
import requireJWTAuth from "../../middleware/requireJWTAuth.js";
import Conversation from "../../models/Conversation.js";
import Message from "../../models/Message.js";
import { messageSchema } from "../../validators/message-validator.js";

const router = Router();

// GET api/chat/conversations - get all conversations of logged user
router.get("/conversations", requireJWTAuth, async (req, res) => {
  try {
    const conversations = await Conversation.find(
      {
        members: { $in: [req.user._id] },
      },
      null,
      {
        sort: { updatedAt: "desc" },
      }
    )
      .populate("members")
      .populate({
        path: "messages",
        options: {
          limit: 1,
          sort: { createdAt: "desc" },
        },
      });

    let conversationsWithUnread = [];
    for (let conv of conversations) {
      const newCount = await conv.countUnread(req.user._id);
      conv = conv.toObject();
      conv.new = newCount;
      conversationsWithUnread.push(conv);
    }
    res.send(conversationsWithUnread);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET api/chat/conversations/unread - get number of unread messages
router.get("/conversations/unread", requireJWTAuth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.user._id] },
    });

    let unreadCount = 0;

    for (let conv of conversations) {
      unreadCount += await conv.countUnread(req.user._id);
    }

    res.send({ unreadCount });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET api/chat/conversation/:id - get conversation with a user
router.get("/conversation/:id", requireJWTAuth, async (req, res) => {
  try {
    let conversation = await Conversation.findOne({
      members: { $all: [req.params.id, req.user._id] },
    })
      .populate("members")
      .populate("messages");

    // create conversation if not found
    if (!conversation) {
      conversation = new Conversation({
        members: [req.user._id, req.params.id],
      });
      await conversation.save();
      await conversation.populate("members");
      await conversation.populate("messages");
    }

    const unread = await conversation.countUnread(req.user._id);

    res.send({ ...conversation.toJSON(), unread });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST api/chat/message - create message
router.post("/message", requireJWTAuth, async (req, res) => {
  try {
    const { error } = messageSchema.validate(req.body);
    if (error)
      return res.status(422).send({ message: error.details[0].message });

    const { conversation, text } = req.body;

    const message = new Message({
      conversation,
      text,
      sender: req.user._id,
    });
    await message.save();
    await message.populate("conversation");
    message.conversation.updatedAt = message.createdAt;
    await message.conversation.save();
    res.send(message);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// PATCH api/chat/:conversationId/read - mark all messages as read
router.patch("/:conversationsId/read", requireJWTAuth, async (req, res) => {
  if (!isValidObjectId(req.params.conversationsId)) {
    return res.status(400).send({ message: "Not valid id" });
  }

  try {
    const result = await Message.updateMany(
      {
        conversation: req.params.conversationsId,
      },
      { $set: { read: true } }
    );
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;
