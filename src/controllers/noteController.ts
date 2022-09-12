import { 
    Request, 
    Response 
} from "express";

import * as noteService from "../services/noteService";
import { INotesData } from "../types/noteTypes";

export async function createNote(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;
    const { 
        title, 
        description 
    }: { 
        title: string, 
        description: string 
    } = req.body;

    const note: INotesData = {
        description,
        title,
        userId: userData.userId
    }

    await noteService.createNote(note);

    return res.status(201).send("Note created.");
};

export async function getNotes(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;

    const notes = await noteService.getNotes(userData.userId);

    return res.status(200).send(notes);
}

export async function getNoteById(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;
    const id: number = Number(req.params.id);

    const note = await noteService.getNoteById(userData.userId, id);

    return res.status(200).send(note);
}

export async function deleteNote(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;
    const id: number = Number(req.params.id);

    await noteService.deleteNoteById(userData.userId, id);

    return res.status(200).send("Note deleted.");
}