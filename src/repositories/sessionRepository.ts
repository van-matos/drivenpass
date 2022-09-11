import connection from "../dbStrategy/database";

import { ISessionData } from "../types/authTypes";

export async function newSession(data: ISessionData) {
    await connection.sessions.create({ data: data });
};