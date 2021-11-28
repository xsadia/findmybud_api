import { Context } from "koa";
import Router from "koa-router";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const postRouter = new Router({
  prefix: "/posts",
});

postRouter.get("/", ensureAuthenticated, (ctx: Context) => {
  const { _id } = ctx.user;
  ctx.body = {
    user: _id,
  };
});
