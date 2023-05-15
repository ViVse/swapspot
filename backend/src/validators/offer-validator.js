import Joi from "joi";

export const offerSchema = Joi.object({
  to: {
    user: Joi.string().required(),
    products: Joi.array().items(Joi.string()).min(1),
  },
  products: Joi.array().items(Joi.string()).min(1),
});
