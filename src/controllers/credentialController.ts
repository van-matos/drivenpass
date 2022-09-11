import { 
    Request, 
    Response 
} from "express";

import * as credentialService from "../services/credentialService";
import { ICredentialData } from "../types/credentialTypes";

export async function createCredential(
    req: Request, 
    res: Response
) {
    const { 
        url, 
        username, 
        password, 
        title 
    }: { 
        url: string, 
        username: string, 
        password: string, 
        title: string 
    } = req.body;

    const { userData } = res.locals;

    const credential: ICredentialData = {
        url,
        username,
        password,
        title,
        userId: userData.userId
    };

    await credentialService.createCredential(credential);

    return res.status(201).send("Credential created.");
}

export async function deleteCredential(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;
    const id: number = Number(req.params.id);

    await credentialService.deleteCredential(userData.userId, id);

    return res.status(200).send("Credential deleted.");
}

export async function getCredentials(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;

    const credentials = await credentialService.getCredentials(userData.userId);

    return res.status(200).send(credentials);
}

export async function getCredentialById(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;
    const id: number = Number(req.params.id);

    const credential = await credentialService.getCredentialById(userData.userId, id);

    return res.status(200).send(credential);
}

