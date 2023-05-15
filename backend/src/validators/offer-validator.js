import Joi from "joi";

export const offerSchema = Joi.object({
  to: {
    user: Joi.string().required(),
    products: Joi.array().items(Joi.string()),
  },
  products: Joi.array().items(Joi.string()),
});
