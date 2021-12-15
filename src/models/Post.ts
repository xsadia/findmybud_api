import { Schema, model, Document, Types } from "mongoose";

export interface IPost extends Document {
  postType: "found" | "lost";
  author: Types.ObjectId;
  lat: string;
  lon: string;
  content: string;
  comments: Types.Array<Types.ObjectId>;
  likes: Types.Array<Types.ObjectId>;
}

const PostSchema = new Schema(
  {
    postType: {
      type: String,
      enum: ["found", "lost"],
      default: "lost",
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    lat: {
      type: String,
      required: true,
    },
    lon: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comment: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", PostSchema);
