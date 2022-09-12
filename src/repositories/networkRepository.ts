import connection from "../dbStrategy/database";
import { INetworkData } from "../types/networkTypes";

export async function insertNetwork(network: INetworkData) {
    await connection.networks.create({ data: network });
}

export async function getNetworks(userId: number) {
    return await connection.networks.findMany({ where: { userId } });
}

export async function getNetworkById(id: number) {
    return await connection.networks.findFirst({ where: { id } });
}

export async function deleteNetwork(id: number) {
    await connection.networks.delete({ where: { id } });
}