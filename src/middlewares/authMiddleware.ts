import { 
    Request, 
    Response, 
    NextFunction 
} from "express";

import { checkError } from "./errorHandler";
import { findSession } from "../repositories/sessionRepository";

export default async function authValidation(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const token = req.headers['x-api-key'];
    
    if (!token) 
        throw checkError(401, "Unauthorized.");

    const session = await findSession(token);

    if(!session) 
        throw checkError(401, "Session expired.");

    const userData = {
        token,
        userId: session.userId
    };

    res.locals.userData = userData;

    next();
}