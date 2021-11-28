import Koa from "koa";
import convert from "koa-convert";
import cors from "koa-cors";
import bodyParser from "koa-bodyparser";
import { userRouter } from "./routes/userRoutes";
import { postRouter } from "./routes/postRoutes";

const app = new Koa();

app.use(bodyParser());
app.use(convert(cors()));
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(postRouter.routes()).use(postRouter.allowedMethods());

export default app;
