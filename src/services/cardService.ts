import { checkError } from "../middlewares/errorHandler";
import * as cardRepository from "../repositories/cardRepository";
import { ICardData } from "../types/cardTypes";
import { decrypt, encrypt } from "../utils/encryptionUtils";

export async function createCard(card: ICardData) {
    const checkCard = await cardRepository.findCardByTitle(card.title, card.userId);

    if (checkCard) 
        throw checkError(401, "Card with this title already registered");

    card.password = encrypt(card.password);
    card.securityCode = encrypt(card.securityCode);


    await cardRepository.insertCard(card);
}

export async function getCards(userId: number) {
    const cards = await cardRepository.getCards(userId);

    cards.forEach((card: { password: string; securityCode: string; }) => {
        card.password = decrypt(card.password);
        card.securityCode = decrypt(card.securityCode);
    });

    return cards;
}

export async function getCardById(userId: number, id: number) {
    const card = await cardRepository.getCardById(id);

    if (!card) 
        throw checkError(404, "No cards found.");
    if (card.userId !== userId) throw checkError(401, "Unauthorized.");

    card.password = decrypt(card.password);
    card.securityCode = decrypt(card.securityCode);

    return card;
}

export async function deleteCard(userId: number, id: number) {
    const card = await cardRepository.getCardById(id);

    if (!card) throw checkError(404, "Card not found.");
    if (card.userId !== userId) throw checkError(401, "Unauthorized.");

    await cardRepository.deleteCard(id);
}