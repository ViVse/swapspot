import Joi from "joi";

export const messageSchema = Joi.object({
  conversation: Joi.string().required(),
  text: Joi.string().required(),
});
