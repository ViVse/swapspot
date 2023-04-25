import { Router } from "express";
import Joi from "joi";

import User from "../../models/User.js";
import requireLocalAuth from "../../middleware/requireLocalAuth.js";
import { registerSchema } from "../../config/passport/validators.js";

const router = Router();

router.post("/login", requireLocalAuth, (req, res) => {
  const token = req.user.generateJWT();
  const me = req.user.toJSON();
  res.cookie("x-auth-token", token, {
    maxAge: 2 * 24 * 60 * 60 * 1000, //2 days
  });
  res.json({ me });
});

router.post("/register", async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(422).send({ message: error.details[0].message });
  }

  const { email, password, name, username } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ message: "Email is in use" });
    }

    try {
      const newUser = await new User({
        provider: "email",
        email,
        password,
        username,
        name,
      });

      const user = await newUser.registerUser(newUser);
      res.send(user);
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

export default router;
