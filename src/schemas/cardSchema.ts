import joi from "joi";

const cardSchema = joi.object({
    number: joi.string().required().pattern(/^[0-9]{16}$/),
    name: joi.string().required(),
    securityCode: joi.string().required().pattern(/^[0-9]{3}$/),
    expirationDate: joi.string().required().pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/),
    isVirtual: joi.boolean().required(),
    password: joi.string().min(4).required(),
    type: joi.string().valid("combination", "credit","debit").required(),
    title: joi.string().required()
});

export default cardSchema;