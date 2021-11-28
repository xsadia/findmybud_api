import { Context } from "koa";
import { GetPost } from "../../api/post/GetPost";
import { AppError } from "../../error/AppError";

export const getPostController = async (ctx: Context) => {
    try {
        const { id } = ctx.params;
        const response = await GetPost(id);

        ctx.status = 200;
        ctx.body = {
            post: response
        };

        return;
    } catch (err) {
        if (err instanceof AppError) {
            ctx.status = err.statusCode;
            ctx.body = {
                error: err.message
            };

            return;
        }

        ctx.status = 500;
        ctx.body = {
            error: "Internal server error"
        };

        return;
    }
};