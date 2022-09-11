import dotenv from "dotenv";

import { checkError } from "../middlewares/errorHandler";
import * as userRepository from "../repositories/userRepository";
import { IUserData } from "../types/userTypes";
import { encryptPassword } from "../utils/authUtils";

dotenv.config();

export async function signUp(user: IUserData) {
    const { email, password } = user;

    const checkUser = await userRepository.findUserByEmail(email);

    if (checkUser) 
        throw checkError(401, "This email has already been registered!");

    await userRepository.createUser(email, encryptPassword(password));
}