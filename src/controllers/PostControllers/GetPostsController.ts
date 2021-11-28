import { Context } from "koa";
import { GetPosts } from "../../api/post/GetPosts";

export const getPostsController = async (ctx: Context) => {
    try {
        const response = await GetPosts();

        ctx.status = 200;
        ctx.body = {
            posts: response
        };

        return;
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            error: "Internal server error"
        };

        return;
    }
};