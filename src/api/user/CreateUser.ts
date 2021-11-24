import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { authConfig } from "../../config/jwtConfig";
import { AppError } from "../../error/AppError";
import { IUser, User } from "../../models/User";

type CreateUserRequest = {
  email: IUser["email"];
  username: IUser["username"];
  password: IUser["password"];
};

type CreateUserResponse = {
  user: Omit<IUser, "password">;
  token: string;
};

export const CreateUser = async ({
  email,
  username,
  password,
}: CreateUserRequest): Promise<CreateUserResponse> => {
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw new AppError("Email already registered");
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    throw new AppError("Username already registered");
  }

  const hashedPassword = await hash(password, 8);

  const user = new User({
    email,
    username,
    password: hashedPassword,
  });

  await user.save();

  const { expiresIn, secret } = authConfig.jwt;

  const token = sign({}, secret, {
    subject: user._id.toString(),
    expiresIn,
  });

  user.password = "";

  return {
    user,
    token,
  } as CreateUserResponse;
};
