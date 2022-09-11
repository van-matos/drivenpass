import dotenv from "dotenv";

import { checkError } from "../middlewares/errorHandler";
import { newSession } from "../repositories/sessionRepository";
import * as userRepository from "../repositories/userRepository";
import { IUserData } from "../types/authTypes";
import * as authUtils from "../utils/authUtils";

dotenv.config();

export async function signUp(user: IUserData) {
    const { email, password } = user;

    const checkUser = await userRepository.findUserByEmail(email);

    if (checkUser) 
        throw checkError(401, "Email already registered.");

    await userRepository.createUser(email, authUtils.encryptPassword(password));
}

export async function signIn(email: string, password: string) {
    const user = await userRepository.findUserByEmail(email);

    if (!user || await authUtils.verifyPassword(password, user.password)) 
        throw checkError(401, "Email or password is incorrect.");

    const token: string = authUtils.generateToken(user.id);

    const userData = {
        userId: user.id,
        token
    }

    await newSession(userData);

    return userData;
}