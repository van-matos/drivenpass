import {
    Request, 
    Response 
} from "express";

import * as authService from "../services/authService";
import { IUserData } from "../types/authTypes";

export async function signUp(
    req: Request, 
    res: Response
) {
    const { email, password }: { email: string, password: string } = req.body;

    const user: IUserData = {
        email,
        password
    }

    await authService.signUp(user);

    res.status(201).send({ message: "Registration complete." });
}

export async function signIn(
    req: Request, 
    res: Response
) {
    const { email, password }: { email: string, password: string } = req.body;

    const userData = await authService.signIn(email, password);

    res.status(200).send(userData.token);
}