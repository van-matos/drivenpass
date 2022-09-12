import {
    Request, 
    Response 
} from "express";

import * as cardService from "../services/cardService"
import { ICardData } from "../types/cardTypes";

export async function createCard(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;
    const { 
        number,
        name,
        securityCode,
        expirationDate,
        isVirtual,
        password,
        type,
        title 
    } = req.body;

    const card: ICardData = {
        number,
        name,
        securityCode,
        expirationDate,
        isVirtual,
        password,
        type,
        title,
        userId: userData.userId,
    }

    await cardService.createCard(card);

    return res.status(201).send("Card created.");
};

export async function deleteCard(
    req:Request, 
    res:Response
) {
    const { userData } = res.locals;
    const id: number = Number(req.params.id);

    await cardService.deleteCard(userData.userId, id);

    return res.status(200).send("Card removed!");
}

export async function getCards(
    req: Request, 
    res: Response
) {
    const { userData } = res.locals;

    const cards = await cardService.getCards(userData.userId);

    return res.status(200).send(cards);
}

export async function getCardById(
    req:Request, 
    res:Response
) {
    const { userData } = res.locals;
    const id: number = Number(req.params.id);

    const card = await cardService.getCardById(userData.userId, id);

    return res.status(200).send(card);
}