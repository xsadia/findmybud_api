import { connectDB } from "../../../mongodb";
import { connection, disconnect } from "mongoose";
import { CreateUser } from "../CreateUser";
import { AppError } from "../../../error/AppError";
import dotenv from "dotenv";
dotenv.config();

const testDb = process.env.MONGODB_TEST_URL as string;

beforeAll(() => connectDB(testDb));
beforeEach(async () => await connection.db.dropDatabase());
afterAll(() => disconnect());

it("should create user if credentials unique", async () => {
  const testUser = {
    email: "fezin@gmail.com",
    username: "fezin",
    password: "123123",
  };

  const response = await CreateUser(testUser);

  expect(response.user.email).toBe(testUser.email);
  expect(response.user.username).toBe(testUser.username);
  expect(response.user._id).toBeDefined();
  expect(response.token).toBeDefined();
});

it("should throw error if email is not unique", async () => {
  try {
    const testUser = {
      email: "fezin@gmail.com",
      username: "fezin",
      password: "123123",
    };

    await CreateUser(testUser);
    await CreateUser(testUser);
  } catch (e) {
    if (e instanceof AppError) {
      expect(e.message).toMatch("Email already registered");
      expect(e.statusCode).toBe(400);
    }
  }
});

it("should throw error if username is not unique", async () => {
  try {
    const testUser = {
      email: "fezin@gmail.com",
      username: "fezin",
      password: "123123",
    };

    const testUser2 = {
      email: "fezin1@gmail.com",
      username: "fezin",
      password: "123123",
    };

    await CreateUser(testUser);
    await CreateUser(testUser2);
  } catch (e) {
    if (e instanceof AppError) {
      expect(e.message).toMatch("Username already registered");
      expect(e.statusCode).toBe(400);
    }
  }
});
