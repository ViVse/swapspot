import { Router } from "express";
import usersRouter from "./user.js";
import productRouter from "./product.js";
import offerRouter from "./offer.js";
import notificationRouter from "./notification.js";
import chatRouter from "./chat.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/products", productRouter);
router.use("/offers", offerRouter);
router.use("/notifications", notificationRouter);
router.use("/chat", chatRouter);

export default router;
