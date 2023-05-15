import { Router } from "express";
import usersRouter from "./user.js";
import productRouter from "./product.js";
import offerRouter from "./offer.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/products", productRouter);
router.use("/offers", offerRouter);

export default router;
