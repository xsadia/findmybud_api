import { connect } from "mongoose";

export const connectDB = async (url: string) => {
  await connect(url);
  console.log(`Mongo connected on ${url}`);
};
