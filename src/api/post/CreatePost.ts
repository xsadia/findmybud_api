import { AppError } from "../../error/AppError";
import { IPost, Post } from "../../models/Post";
import { User } from "../../models/User";

type CreatePostResponse = {
  postType: IPost["postType"];
  author: IPost["author"];
  location: IPost["location"];
  content: IPost["content"];
};

export const CreatePost = async ({
  author,
  postType,
  location,
  content,
}: CreatePostResponse): Promise<IPost> => {
  const userExists = await User.findOne({ _id: author });
  if (!userExists) {
    throw new AppError("User not found", 404);
  }

  const post = new Post({
    author,
    postType,
    location,
    content,
  });

  await post.save();

  return post;
};
