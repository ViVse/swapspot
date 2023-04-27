import { Router } from "express";
import localAuthRoutes from "./auth/localAuth.js";
import googleAuthRoutes from "./auth/googleAuth.js";
import apiRoutes from "./api/index.js";

const router = Router();

router.use("/auth", localAuthRoutes);
router.use("/auth", googleAuthRoutes);
router.use("/api", apiRoutes);
// fallback 404
router.use("/api", (req, res) =>
  res.status(404).json("No route for this path")
);

export default router;

/*
routes:

GET /auth/google
GET /auth/google/callback

POST /auth/login
POST /auth/register
GET /auth/logout

GET /api/users/
GET /api/users/me
PUT /api/users/me
DELETE /api/users/me
GET /api/users/admin
GET /api/users/:id

GET api/products
POST api/products
GET api/products/:id
PUT api/products/:id
PUT api/products/:id/imgs
DELETE api/products/:id
*/
