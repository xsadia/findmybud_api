import { verify } from "jsonwebtoken";
import { Context, Next } from "koa";
import { authConfig } from "../config/jwtConfig";

type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

export const graphqlEnsureAuthenticated = (ctx: Context, next: Next) => {
  try {
    const authorizationHeader = ctx.header.authorization;

    if (!authorizationHeader) {
      ctx.user = {
        id: null,
      };

      return next();
    }

    const [, token] = authorizationHeader.split(" ");

    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    ctx.user = {
      id: sub,
    };

    return next();
  } catch {
    ctx.user = {
      id: null,
    };

    return next();
  }
};
