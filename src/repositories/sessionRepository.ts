import connection from "../dbStrategy/database";
import { ISessionData } from "../types/authTypes";

export async function newSession(data: ISessionData) {
    await connection.sessions.create({ data: data });
}

export async function findSession(token: any) {
    return await connection.sessions.findFirst({ where: { token } });
}