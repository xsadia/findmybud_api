import { Context } from "koa";
import { CreateUser } from "../../api/user/CreateUser";
import { AppError } from "../../error/AppError";
import dotenv from "dotenv";
dotenv.config();

export const createUserController = async (ctx: Context) => {
  try {
    const { email, username, password } = ctx.request.body;

    const { user, token } = await CreateUser({
      email,
      username,
      password,
    });

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
