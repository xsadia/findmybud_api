import { IPost, Post } from '../../models/Post';

export const GetPosts = async (): Promise<Array<IPost>> => {
    const posts = await Post.find();

    return posts;
};