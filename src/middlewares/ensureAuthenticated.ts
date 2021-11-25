import { verify } from "jsonwebtoken";
import { Context, Next } from "koa";
import { authConfig } from "../config/jwtConfig";
import { AppError } from "../error/AppError";

type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

export const ensureAuthenticated = (ctx: Context, next: Next) => {
  try {
    const cookie = ctx.cookies.get("access_token");
    if (!cookie) {
      throw new AppError("Authorization token missing", 403);
    }

    const decoded = verify(cookie, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    ctx.user = {
      _id: sub,
    };

    return next();
  } catch (err) {
    if (err instanceof AppError) {
      ctx.status = err.statusCode;
      ctx.body = {
        error: err.message,
      };

      return;
    }

    ctx.status = 403;
    ctx.body = {
      error: "Invalid JWT token",
    };

    return;
  }
};
