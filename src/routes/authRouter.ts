import { Router } from "express";

import * as authController from "../controllers/authController";
import { validateSchema } from "../middlewares/schemaValidation";
import authSchema from "../schemas/authSchema";

const authRouter = Router();

authRouter.post(
    "/signup", 
    validateSchema(authSchema), 
    authController.signUp
);

authRouter.post(
    "/signin", 
    validateSchema(authSchema), 
    authController.signIn
);

export default authRouter;