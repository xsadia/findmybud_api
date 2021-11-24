import { connectDB } from "../../../mongodb";
import { connection, disconnect } from "mongoose";
import { CreateUser } from "../CreateUser";
import { AuthUser } from "../AuthUser";
import { AppError } from "../../../error/AppError";
import dotenv from "dotenv";
dotenv.config();

const testDb = process.env.MONGODB_TEST_URL as string;

beforeAll(() => connectDB(testDb));
beforeEach(async () => await connection.db.dropDatabase());
afterAll(() => disconnect());

it("should authenticate user if user exists and credentials are correct ", async () => {
  const testUser = {
    email: "fezinAuth@gmail.com",
    username: "fezinAuth",
    password: "123123",
  };

  await CreateUser(testUser);

  const response = await AuthUser({
    email: testUser.email,
    password: testUser.password,
  });

  expect(response.user.email).toBe(testUser.email);
  expect(response.user.username).toBe(testUser.username);
  expect(response.user._id).toBeDefined();
  expect(response.token).toBeDefined();
});

it("should throw error if user does not exist", async () => {
  try {
    await AuthUser({ email: "notAUser@gmail.com", password: "123123" });
  } catch (e) {
    if (e instanceof AppError) {
      expect(e.message).toMatch("Incorrect email/password combination");
      expect(e.statusCode).toBe(403);
    }
  }
});

it("should throw error if password does not match", async () => {
  try {
    const testUser = {
      email: "fezinFailedPass@gmail.com",
      username: "fezinFailedPass",
      password: "123123",
    };

    await CreateUser(testUser);

    await AuthUser({ email: testUser.email, password: "123124" });
  } catch (e) {
    if (e instanceof AppError) {
      expect(e.message).toMatch("Incorrect email/password combination");
      expect(e.statusCode).toBe(403);
    }
  }
});
