import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { STORAGE_OPTIONS } from "../../../const/index.js";
import storage from "../config/storage.js";

const avatarSchema = new mongoose.Schema({
  storage: {
    type: String,
    required: true,
    enum: Object.values(STORAGE_OPTIONS),
  },
  path: {
    type: String,
    required: [
      function () {
        return this.type === STORAGE_OPTIONS.CLOUD;
      },
      "Path must be provided for cloud stored data",
    ],
  },
  publicUrl: {
    type: String,
    required: true,
  },
});

const ratingSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 60,
    },
    avatar: avatarSchema,
    role: { type: String, default: "USER" },
    raitings: {
      type: [ratingSchema],
    },
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
    },
    // google
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    // fb
    facebookId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.role;

  return userObject;
};

userSchema.methods.generateJWT = function () {
  const secretOrKey = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      expiresIn: "12h",
      id: this._id,
      provider: this.provider,
      email: this.email,
    },
    secretOrKey
  );
  return token;
};

userSchema.methods.registerUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hash;
      const user = await newUser.save();
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Actions before user is deleted
userSchema.pre("findOneAndDelete", async function (next) {
  const query = this;
  const user = await query.cursor().next();
  if (user.avatar && user.avatar.storage === STORAGE_OPTIONS.CLOUD) {
    await storage.file(user.avatar.path).delete();
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
