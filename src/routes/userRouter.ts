import { Router } from "express";

import { signUp } from "../controllers/authController";
import signupValidation from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.post('/signup', signupValidation, signUp);

export default userRouter;