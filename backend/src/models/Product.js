import mongoose from "mongoose";
import { CATEGORIES } from "../../../const/categories.js";
import storage from "../storage/storage.js";

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
      type: [
        {
          path: {
            type: String,
            required: [true, "Path must be provided for cloud stored data"],
          },
          publicUrl: {
            type: String,
            required: true,
          },
        },
      ],
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

// Delete product imgs from storage before product deletion
productSchema.pre("findOneAndDelete", async function (next) {
  const query = this;
  const product = await query.cursor().next();
  if (product.imgs.length > 0) {
    try {
      for (const img of product.imgs) {
        await storage.file(img.path).delete();
      }
    } catch (e) {
      console.log(e);
      throw new Error("Couldn't delete imgs");
    }
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
