import { Router } from "express";
import requireJWTAuth from "../../middleware/requireJWTAuth.js";
import requireAdminAuth from "../../middleware/requireAdminAuth.js";
import imgUploadHandler from "../../middleware/imgUploadHandler.js";
import storage from "../../config/storage.js";
import { STORAGE_OPTIONS } from "../../../../const/storageOptions.js";
import User, { hashPassword } from "../../models/User.js";
import { userPutSchema } from "../../validators/user-validator.js";

const router = Router();

// GET - api/users - check login
router.get("/", requireJWTAuth, (req, res) => {
  res.send("success");
});

// GET - api/users/me - get profile info
router.get("/me", requireJWTAuth, (req, res) => {
  const me = req.user.toJSON();
  res.json({ me });
});

// PATCH - api/users/me - change user info
router.patch("/me", requireJWTAuth, async (req, res) => {
  const { error } = userPutSchema.validate(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  try {
    const { name, email, password } = req.body;

    req.user.name = name;
    if (req.user.provider === "email") {
      if (email) req.user.email = email;
      if (password) {
        const newHash = await hashPassword(password);
        req.user.password = newHash;
      }
    }

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send({ message: "Couldn't change user info" });
  }
});

// PUT - api/users/me/avatar - change user avatar
router.put(
  "/me/avatar",
  requireJWTAuth,
  imgUploadHandler.single("avatar"),
  async (req, res) => {
    // Change avatar
    if (req.file) {
      let file;

      // Delete previous avatar if stored on the cloud
      if (
        req.user.avatar &&
        req.user.avatar.storage === STORAGE_OPTIONS.CLOUD
      ) {
        await storage.file(req.user.avatar.path).delete();
      }

      // upload file
      try {
        file = storage.file(
          `avatars/${Date.now()}_${Math.random()}_${req.file.originalname}`
        );

        await file.save(req.file.buffer);
        await file.makePublic();
      } catch (e) {
        res.status(500).send({ message: "Couldn't save file" });
      }

      // update user info
      try {
        req.user.avatar = {
          storage: STORAGE_OPTIONS.CLOUD,
          path: file.name,
          publicUrl: file.publicUrl(),
        };

        await req.user.save();
        res.send();
      } catch (e) {
        if (file) await storage.file(file.name).delete();
        res.status(500).send({ message: "Couldn't update user info" });
      }
    }

    res.status(400).send();
  }
);

// DELETE - api/users/me - delete profile
router.delete("/me", requireJWTAuth, async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id);
  res.send(user);
});

//GET - api/users/:id - get user info
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});

// GET - api/users/admin - route available only for admin
router.get("/admin", requireJWTAuth, requireAdminAuth, (req, res) => {
  res.send("Welcome admin");
});

export default router;
