import { Router } from "express";
import requireJWTAuth from "../../middleware/requireJWTAuth.js";
import requireAdminAuth from "../../middleware/requireAdminAuth.js";

const router = Router();

router.get("/", requireJWTAuth, (req, res) => {
  res.send("success");
});

router.get("/me", requireJWTAuth, (req, res) => {
  const me = req.user.toJSON();
  res.json({ me });
});

router.get("/admin", requireJWTAuth, requireAdminAuth, (req, res) => {
  res.send("Welcome admin");
});

export default router;
