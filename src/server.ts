import app from "./app";
import { createServer } from "http";
import { connectDB } from "./mongodb";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

const server = createServer(app.callback());

(async () => {
  await connectDB(
    process.env.MONGODB_URL || "mongodb://localhost:27017/findmybud"
  );
  server.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
  });
})();
