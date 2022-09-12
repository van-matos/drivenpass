import { checkError } from "../middlewares/errorHandler";
import * as credentialRepository from "../repositories/credentialRepository";
import { ICredentialData } from "../types/credentialTypes";
import { decrypt, encrypt } from "../utils/encryptionUtils";

export async function createCredential(credential: ICredentialData) {

    const checkCredential = await credentialRepository.findCredentialByTitle(credential.title, credential.userId);

    if (checkCredential) 
        throw checkError(401, "Credential with this title already registered.");

    credential.password = encrypt(credential.password);

    await credentialRepository.insertCredential(credential);
}

export async function getCredentials(userId: number) {
    const credentials = await credentialRepository.getCredentials(userId);

    credentials.forEach(credential => credential.password = decrypt(credential.password));
    console.log(credentials);

    return credentials;
}

export async function getCredentialById(userId: number, id: number) {
    const credential = await credentialRepository.getCredentialById(id);

    if (!credential) 
        throw checkError(404, "No credentials found.");

    if (credential.userId !== userId) 
        throw checkError(401, "Unauthorized.");

    credential.password = decrypt(credential.password);

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