import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" }, // Cloudinary image URL

    // New fields 👇
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "users", // references the same User model
      },
    ],
    requests: [
      {
        type: Schema.Types.ObjectId,
        ref: "users", // users who sent friend requests
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
