import Router from "koa-router";
import { createPostController } from "../controllers/PostControllers/CreatePostController";
import { getPostController } from "../controllers/PostControllers/GetPostController";
import { getPostsController } from "../controllers/PostControllers/GetPostsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const postRouter = new Router({
  prefix: "/posts",
});

postRouter.post("/", ensureAuthenticated, createPostController);

postRouter.get("/", getPostsController);

postRouter.get("/:id", getPostController);