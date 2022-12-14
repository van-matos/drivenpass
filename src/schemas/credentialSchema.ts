import joi from "joi";

const credentialSchema = joi.object({
    url: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
    title: joi.string().required()
});

export default credentialSchema;