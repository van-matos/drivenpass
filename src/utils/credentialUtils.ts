import Cryptr from "cryptr";

const CRYPTR_KEY: string = process.env.CRYPTR_KEY || "valex";
const cryptr = new Cryptr(CRYPTR_KEY);

export function encryptPassword(password: string){
    return cryptr.encrypt(password);
}

export function decryptPassword(password: string){
    return cryptr.decrypt(password);
}