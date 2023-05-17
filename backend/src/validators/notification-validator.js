import Joi from "joi";

export const notificationSchema = Joi.object({
  user: Joi.string().required(),
  title: Joi.string().required(),
  text: Joi.string().required(),
  link: Joi.string(),
});
