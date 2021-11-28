import { connectDB } from "../../../mongodb";
import { connection, disconnect, Types } from "mongoose";
import { CreatePost } from "../CreatePost";
import { CreateUser } from "../../user/CreateUser";
import { AppError } from "../../../error/AppError";
import { IPost } from "../../../models/Post";
import dotenv from "dotenv";
dotenv.config();

const testDb = process.env.MONGODB_TEST_URL as string;

beforeAll(() => connectDB(testDb));
beforeEach(async () => await connection.db.dropDatabase());
afterAll(() => disconnect());

it("should create a post if user exists", async () => {
  const testUser = {
    email: "fezin@gmail.com",
    username: "fezin",
    password: "123123",
  };

  const { user } = await CreateUser(testUser);

  const testPost = {
    author: user._id,
    postType: "lost",
    location: "unknown",
    content: "placeholder",
  } as IPost;

  const response = await CreatePost(testPost);

  expect(response._id).toBeDefined();
  expect(response.author).toBe(user._id);
  expect(response.postType).toBe(testPost.postType);
  expect(response.location).toBe(testPost.location);
  expect(response.content).toBe(testPost.content);
});

it("should not create a post if user does not  exists", async () => {
  try {
    const ID = new Types.ObjectId();
    const testPost = {
      author: ID,
      postType: "lost",
      location: "unknown",
      content: "placeholder",
    } as IPost;

    const response = await CreatePost(testPost);
  } catch (e) {
    if (e instanceof AppError) {
      expect(e.message).toMatch("User not found");
      expect(e.statusCode).toBe(404);
    }
  }
});
