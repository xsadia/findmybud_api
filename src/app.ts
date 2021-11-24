import Koa from "koa";
import convert from "koa-convert";
import cors from "koa-cors";
import bodyParser from "koa-bodyparser";
import { userRouter } from "./routes/userRoutes";

const app = new Koa();

app.use(bodyParser());
app.use(convert(cors()));
app.use(userRouter.routes()).use(userRouter.allowedMethods());

export default app;
