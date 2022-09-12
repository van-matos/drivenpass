import { Router } from "express";

import * as cardController from "../controllers/cardController";
import authValidation from "../middlewares/authMiddleware";
import { validateSchema } from "../middlewares/schemaValidation";
import cardSchema from "../schemas/cardSchema";

const cardsRouter = Router();

cardsRouter.post(
    "/cards/new",
    validateSchema(cardSchema),
    authValidation,
    cardController.createCard
);

cardsRouter.get(
    "/cards",
    authValidation,
    cardController.getCards
);

cardsRouter.get(
    "/cards/:id",
    authValidation,
    cardController.getCardById
);

cardsRouter.delete(
    "/cards/delete/:id",
    authValidation,
    cardController.deleteCard
);

export default cardsRouter;