import Router from "koa-router";
import { authUserController } from "../controllers/UserControllers/AuthUserController";
import { createUserController } from "../controllers/UserControllers/CreateUserController";

export const userRouter = new Router({
  prefix: "/users",
});

userRouter.post("/", createUserController);
userRouter.post("/auth", authUserController);
