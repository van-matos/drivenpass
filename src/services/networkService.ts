import { checkError } from "../middlewares/errorHandler";
import * as networkRepository from "../repositories/networkRepository";
import { INetworkData } from "../types/networkTypes";
import * as encryptionUtils from "../utils/encryptionUtils";

export async function createNetwork(network: INetworkData) {
    network.password = encryptionUtils.encrypt(network.password);

    await networkRepository.insertNetwork(network);
}

export async function getNetworks(userId: number) {
    const networks = await networkRepository.getNetworks(userId);

    networks.forEach((network: { password: string; }) => network.password = encryptionUtils.decrypt(network.password));

    return networks;
}

export async function getNetworkById(userId: number, id: number) {
    const network = await networkRepository.getNetworkById(id);

    if (!network) 
        throw checkError(404, "No networks found.");

    if (network.userId !== userId) 
        throw checkError(401, "Unauthorized.");

    network.password = encryptionUtils.decrypt(network.password);

    return network;
}

export async function deleteNetwork(userId: number, id: number) {
    const network = await networkRepository.getNetworkById(id);

    if (!network) 
        throw checkError(404, "Network not found.");

    if (network.userId !== userId) 
        throw checkError(401, "Unauthorized.");
        
    await networkRepository.deleteNetwork(id);
}