import { Router } from "express";

import * as credentialController from "../controllers/credentialController";
import credentialValidation from "../middlewares/credentialMiddleware";
import getUser from "../middlewares/userMiddleware";

const credentialRouter = Router();

credentialRouter.post(
    "/credentials/new", 
    credentialValidation, 
    getUser, 
    credentialController.createCredential
);

credentialRouter.get(
    "/credentials",
    getUser,
    credentialController.getCredentials
);
credentialRouter.get(
    "/credentials/:id",
    getUser,
    credentialController.getCredentialById
);

credentialRouter.delete(
    "/credentials/delete/:id",
    getUser,
    credentialController.deleteCredential
);

export default credentialRouter;