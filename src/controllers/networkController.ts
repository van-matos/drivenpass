import { 
    Request, 
    Response 
} from "express";

import * as networkService from "../services/networkService"
import { INetworkData } from "../types/networkTypes";

export async function createNetwork(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;
    const { 
        name,
        password,
        title 
    } 
    : { 
        name: string, 
        password: string, 
        title: string 
    } = req.body;

    const network: INetworkData = {
        title,
        name,
        password,
        userId: userData.userId
    }

    await networkService.createNetwork(network);

    return res.status(201).send("Network created.");
};

export async function getNetworks(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;

    const networks = await networkService.getNetworks(userData.userId);

    return res.status(200).send(networks);
}

export async function getNetworkById(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;
    const id: number = Number(req.params.id);

    const network = await networkService.getNetworkById(userData.userId, id);

    return res.status(200).send(network);
}

export async function deleteNetwork(
    req:Request, 
    res:Response
) {
    const { userData } = res.locals;
    const id:number = Number(req.params.id);

    await networkService.deleteNetwork(userData.userId, id);

    return res.status(200).send("Network deleted.");
}