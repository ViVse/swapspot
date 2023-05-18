import mongoose from "mongoose";
import Message from "./Message.js";

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

conversationSchema.set("toObject", { virtuals: true });
conversationSchema.set("toJSON", { virtuals: true });

conversationSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "conversation",
});

conversationSchema.methods.countUnread = function (userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const val = await Message.countDocuments({
        conversation: this._id,
        read: false,
        sender: { $ne: userId },
      });
      resolve(val);
    } catch (error) {
      reject(error);
    }
  });
};

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
