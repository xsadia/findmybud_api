import { Context } from "koa";
import { CreatePost } from "../../api/post/CreatePost";
import { AppError } from "../../error/AppError";

export const createPostController = async (ctx: Context) => {
  try {
    const { postType, location, content } = ctx.request.body;
    const { _id } = ctx.user;
    const response = await CreatePost({
      postType,
      location,
      content,
      author: _id,
    });

    ctx.status = 200;
    ctx.body = {
      post: response,
    };

    return;
  } catch (err) {
    if (err instanceof AppError) {
      ctx.status = err.statusCode;
      ctx.body = {
        error: err.message,
      };

      return;
    }

    ctx.status = 500;
    ctx.body = {
      error: "Internal server error",
    };

    return;
  }
};
