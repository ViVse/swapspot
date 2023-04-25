import mongoose from "mongoose";
import { CATEGORIES } from "../../../const";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    category: {
      type: String,
      required: [true, "can't be blank"],
      enum: { values: CATEGORIES, message: "{VALUE} is not supported" },
    },
    description: {
      type: String,
      required: [true, "can't be blank"],
    },
    imgs: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
    },
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
