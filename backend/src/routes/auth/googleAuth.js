import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

const clientUrl = process.env.CLIENT_URL || "google.com";

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    const token = req.user.generateJWT();
    res.cookie("x-auth-token", token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    res.redirect(clientUrl);
  }
);

export default router;
