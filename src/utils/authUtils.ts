import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

export function encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
    const passwordCheck = await bcrypt.compare(password, hash);
    return !passwordCheck;
}

export const generateToken = (userId: number) => {
    return jwt.sign({ userId }, String(process.env.JWT_SECRET), { expiresIn: "24h" });
}