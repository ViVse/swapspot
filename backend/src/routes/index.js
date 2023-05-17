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

GET /api/users/
GET /api/users/me
PATCH /api/users/me
PUT /api/users/me/avatar
DELETE /api/users/me
GET /api/users/admin
GET /api/users/:id

GET api/products
POST api/products
GET - api/users/favorite
PATCH - api/users/favorite/:productId
GET api/products/:id
PUT api/products/:id
PUT api/products/:id/imgs
DELETE api/products/:id

GET api/offers
GET api/offers/id
POST api/offers
PATCH api/offers/id

GET api/notifications
POST api/notifications
PATCH api/notifications/read
DELETE api/notifications/all
DELETE api/notifications/:id
*/
