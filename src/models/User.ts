import { Schema, Document, Types, model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  bio: string;
  followers: Types.Array<Types.ObjectId>;
  following: Types.Array<Types.ObjectId>;
  posts: Types.Array<Types.ObjectId>;
  refreshToken: string;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    followers: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Types.ObjectId,
        ref: "Post",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
