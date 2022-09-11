import { Router } from "express";

import * as authController from "../controllers/authController";
import authValidation from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post(
    "/signup", 
    authValidation, 
    authController.signUp
);
authRouter.post(
    "/signin", 
    authValidation, 
    authController.signIn
);

export default authRouter;