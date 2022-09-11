import connection from "../dbStrategy/database";
import { ICredentialData } from "../types/credentialTypes";

export async function deleteCredential(id: number) {
    await connection.credentials.delete({ where: { id } });
}

export async function findByTitle(title: string, userId: number) {
    return await connection.credentials.findFirst({ where: { title, userId } });
}

export async function getCredentials(userId: number) {
    return await connection.credentials.findMany({ where: { userId } });
}

export async function getCredentialById(id: number) {
    return await connection.credentials.findFirst({ where: { id } });
}

export async function insert(credential: ICredentialData) {
    await connection.credentials.create({ data: credential });
}