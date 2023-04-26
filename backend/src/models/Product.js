import mongoose from "mongoose";
import { CATEGORIES } from "../../../const";

const productImgSchema = new mongoose.Schema({
  path: {
    type: String,
    required: [true, "Path must be provided for cloud stored data"],
  },
  publicUrl: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    category: {
      type: String,
      required: [true, "can't be blank"],
      enum: {
        values: CATEGORIES.getCategoriesArr(),
        message: "{VALUE} is not supported",
      },
    },
    description: {
      type: String,
      required: [true, "can't be blank"],
    },
    imgs: {
      type: [productImgSchema],
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
