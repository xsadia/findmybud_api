import Koa, { Context, Request, Response } from "koa";
import convert from "koa-convert";
import cors from "koa-cors";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import koaPlayground from "graphql-playground-middleware-koa";
import { graphqlHTTP } from "koa-graphql";
import { userRouter } from "./routes/userRoutes";
import { postRouter } from "./routes/postRoutes";
import { schema } from "./graphql/schema";

const app = new Koa();
const router = new Router();

const graphqlSettingsPerReq = async (
  req: Request,
  _: Response,
  ctx: Context
) => {
  const { user } = ctx;
  return {
    graphiql: false,
    schema,
    context: {
      user,
      req,
    },
    customFormatErrorFn: (error: any) => {
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
};

const graphqlServer = graphqlHTTP(graphqlSettingsPerReq);

router.all("/graphql", graphqlServer);
router.all("/graphql/playground", koaPlayground({ endpoint: "/graphql" }));

app.use(bodyParser());
app.use(convert(cors()));

app.use(router.routes()).use(router.allowedMethods());

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(postRouter.routes()).use(postRouter.allowedMethods());

export default app;
