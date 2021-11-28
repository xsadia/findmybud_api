import { connectDB } from "../../../mongodb";
import { connection, disconnect, Types } from "mongoose";
import { CreatePost } from "../CreatePost";
import { CreateUser } from "../../user/CreateUser";
import { AppError } from "../../../error/AppError";
import { IPost } from "../../../models/Post";
import dotenv from "dotenv";
import { GetPost } from "../GetPost";
dotenv.config();

const testDb = process.env.MONGODB_TEST_URL as string;

beforeAll(() => connectDB(testDb));
beforeEach(async () => await connection.db.dropDatabase());
afterAll(() => disconnect());


it("Should return a post if it exists", async () => {
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

    const post = await CreatePost(testPost);

    const response = await GetPost(post._id);

    expect(response._id).toStrictEqual(post._id);
    expect(response.author).toStrictEqual(user._id);
});

it("Should not return a post if it does not exist", async () => {
    try {
        const ID = new Types.ObjectId();
        const response = await GetPost(ID);
    } catch (e) {
        if (e instanceof AppError) {
            expect(e.message).toMatch("Post not found");
            expect(e.statusCode).toBe(404);
        }
    }
});