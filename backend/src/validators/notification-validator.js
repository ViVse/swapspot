import Joi from "joi";

export const notificationSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  link: Joi.string(),
});
