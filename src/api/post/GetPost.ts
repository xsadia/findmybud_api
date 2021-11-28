import { AppError } from "../../error/AppError";
import { IPost, Post } from "../../models/Post";

export const GetPost = async (_id: string): Promise<IPost> => {
    const postExists = await Post.findOne({ _id });
    if (!postExists) {
        throw new AppError('Post not found', 404);
    }

    return postExists;
};