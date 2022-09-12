import { Router } from "express";

import * as networkController from "../controllers/networkController";
import { validateSchema } from "../middlewares/schemaValidation";
import authValidation from "../middlewares/authMiddleware";
import networkSchema from "../schemas/networkSchema";


const networkRouter = Router();

networkRouter.post(
    "/networks/new",
    validateSchema(networkSchema),
    authValidation,
    networkController.createNetwork
);

networkRouter.get(
    "/networks",
    authValidation,
    networkController.getNetworks
);

networkRouter.get(
    "/networks/:id",
    authValidation,
    networkController.getNetworkById
);

networkRouter.delete(
    "/networks/delete/:id",
    authValidation,
    networkController.deleteNetwork
);

export default networkRouter;