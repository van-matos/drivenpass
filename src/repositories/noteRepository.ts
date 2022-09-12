import connection from "../dbStrategy/database";
import { INotesData } from "../types/noteTypes";

export async function insertNote(note: INotesData) {
    await connection.securenotes.create({ data: note });
}

export async function findNoteByTitle(title: string, userId: number) {
    return await connection.securenotes.findFirst({ where: { title, userId } });
}

export async function getNotes(userId: number){
    return await connection.securenotes.findMany({ where: { userId } });
}

export async function getNoteById(id: number){
    return await connection.securenotes.findFirst({ where: { id } });
}

export async function deleteNote(id:number){
    await connection.securenotes.delete({ where: { id } });
}