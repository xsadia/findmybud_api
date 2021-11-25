import { Schema, model, Document, Types } from "mongoose";

export interface IComment extends Document {
  author: Types.ObjectId;
  parent: Types.ObjectId;
  content: string;
  likes: Types.Array<Types.ObjectId>;
}

const CommentSchema = new Schema(
  {
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    parent: {
      type: Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Types.Subdocument,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Comment = model<IComment>("Comment", CommentSchema);
