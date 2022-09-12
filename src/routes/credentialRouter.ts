import { Router } from "express";

import * as credentialController from "../controllers/credentialController";
import { validateSchema } from "../middlewares/schemaValidation";
import authValidation from "../middlewares/authMiddleware";
import credentialSchema from "../schemas/credentialSchema";

const credentialRouter = Router();

credentialRouter.post(
    "/credentials/new", 
    validateSchema(credentialSchema), 
    authValidation, 
    credentialController.createCredential
);

credentialRouter.get(
    "/credentials",
    authValidation,
    credentialController.getCredentials
);

credentialRouter.get(
    "/credentials/:id",
    authValidation,
    credentialController.getCredentialById
);

credentialRouter.delete(
    "/credentials/delete/:id",
    authValidation,
    credentialController.deleteCredential
);

export default credentialRouter;