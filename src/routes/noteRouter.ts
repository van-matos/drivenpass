import { Router } from "express";

import * as notesController from "../controllers/noteController";
import { validateSchema } from "../middlewares/schemaValidation";
import authValidation from "../middlewares/authMiddleware";
import noteSchema from "../schemas/noteSchema";


const notesRouter = Router();

notesRouter.post(
    "/notes/new",
    validateSchema(noteSchema),
    authValidation,
    notesController.createNote
);

notesRouter.get(
    "/notes",
    authValidation,
    notesController.getNotes
);

notesRouter.get(
    "/notes/:id",
    authValidation,
    notesController.getNoteById
);

notesRouter.delete(
    "/notes/delete/:id",
    authValidation,
    notesController.deleteNote
);

export default notesRouter;