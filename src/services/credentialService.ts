import { checkError } from "../middlewares/errorHandler";
import * as credentialRepository from "../repositories/credentialRepository";
import { ICredentialData } from "../types/credentialTypes";
import { encryptPassword, decryptPassword } from "../utils/credentialUtils";

export async function createCredential(credential: ICredentialData) {

    const checkCredential = await credentialRepository.findByTitle(credential.title, credential.userId);

    if (checkCredential) 
        throw checkError(401, "Credential with this title already registered.");

    credential.password = encryptPassword(credential.password);

    await credentialRepository.insert(credential);
}

export async function getCredentials(userId: number) {
    const credentials = await credentialRepository.getCredentials(userId);

    credentials.forEach(credential => credential.password = decryptPassword(credential.password));
    console.log(credentials);

    return credentials;
}

export async function getCredentialById(userId: number, id: number) {
    const credential = await credentialRepository.getCredentialById(id);

    if (!credential) 
        throw checkError(404, "No credentials found.");

    if (credential.userId !== userId) 
        throw checkError(401, "Unauthorized.");

    credential.password = decryptPassword(credential.password);

    return credential;
}

export async function deleteCredential(userId: number, id: number) {
    const credential = await credentialRepository.getCredentialById(id);

    if (!credential) 
        throw checkError(404, "Credential not found.");

    if (credential.userId !== userId) 
        throw checkError(401, "Unauthorized.");

    await credentialRepository.deleteCredential(id);
}