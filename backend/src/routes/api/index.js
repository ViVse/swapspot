import { Router } from "express";
import usersRouter from './user.js'

const router = Router();

router.use('/users', usersRouter);

export default router