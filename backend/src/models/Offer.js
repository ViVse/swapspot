import mongoose from "mongoose";
import { OFFER_STATUS } from "../../../const/offerStatus.js";

const offerSchema = new mongoose.Schema(
  {
    to: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      products: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "Product",
      },
    },
    from: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      products: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "Product",
      },
    },
    status: {
      type: String,
      required: [true, "can't be blank"],
      enum: { values: OFFER_STATUS, message: "{VALUE} is not supported" },
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
