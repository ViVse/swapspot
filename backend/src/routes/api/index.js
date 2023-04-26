import { Router } from "express";
import usersRouter from "./user.js";
import productRouter from "./product.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/products", productRouter);

export default router;
