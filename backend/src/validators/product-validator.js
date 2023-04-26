import Joi from "joi";
import { CATEGORIES } from "../../../const/categories.js";

export const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string()
    .valid(...CATEGORIES.getCategoriesArr())
    .required(),
  description: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  location: Joi.string(),
});
