import Joi from "joi";

export const userPutSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  password: Joi.string().trim().min(6).max(20),
});
