import { Context } from "koa";
import { AuthUser } from "../../api/user/AuthUser";
import { AppError } from "../../error/AppError";

export const authUserController = async (ctx: Context) => {
  try {
    const { email, password } = ctx.request.body;
    const { user, token } = await AuthUser({ email, password });

    ctx.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    ctx.status = 200;
    ctx.body = {
      user,
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
