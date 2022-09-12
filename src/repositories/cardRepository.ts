import connection from "../dbStrategy/database";
import { ICardData } from "../types/cardTypes";

export async function deleteCard(id: number) {
    await connection.cards.delete({ where: { id } });
}

export async function findCardByTitle(title: string, userId: number) {
    return await connection.cards.findFirst({ where: { title, userId } });
}

export async function getCards(userId: number) {
    return await connection.cards.findMany({ where: { userId } });
}

export async function getCardById(id: number) {
    return await connection.cards.findFirst({ where: { id } });
}

export async function insertCard(card: ICardData) {
    await connection.cards.create({ data: card });
}