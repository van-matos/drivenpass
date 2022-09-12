import { checkError } from "../middlewares/errorHandler";
import * as noteRepository from "../repositories/noteRepository";
import { INotesData } from "../types/noteTypes";

export async function createNote(note: INotesData) {
    const checknote = await noteRepository.findNoteByTitle(note.title, note.userId);

    if (checknote) 
        throw checkError(401, "Note with this title already registered.");

    await noteRepository.insertNote(note);
}

export async function getNotes(userId: number) {
    const notes = await noteRepository.getNotes(userId);

    return notes;
}

export async function getNoteById(userId: number, id: number) {
    const note = await noteRepository.getNoteById(id);

    if (!note) 
        throw checkError(404, "No notes found.");

    if (note.userId !== userId) 
        throw checkError(401, "Unauthorized.");

    return note;
}

export async function deleteNoteById(userId: number, id: number) {
    const note = await noteRepository.getNoteById(id);

    if (!note) 
        throw checkError(404, "Note not found.");

    if (note.userId !== userId) 
        throw checkError(401, "Unauthorized.");
        
    await noteRepository.deleteNote(id);
}