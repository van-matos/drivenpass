import { Request, 
    Response, 
    NextFunction 
} from "express";

import signupSchema from "../schemas/authSchema";

export default function signupValidation(
    req:Request, 
    res:Response, 
    next:NextFunction
) {

    const { error } = signupSchema.validate(req.body, { abortEarly:false });

    if (error) 
        return res.status(422).send(error.details.map((detail: { message: any; }) => detail.message));

    next();
}