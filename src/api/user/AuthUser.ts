import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { authConfig } from "../../config/jwtConfig";
import { AppError } from "../../error/AppError";
import { IUser, User } from "../../models/User";

type AuthUserRequest = {
  email: IUser["email"];
  password: IUser["password"];
};

type AuthUserResponse = {
  user: Omit<IUser, "password">;
  token: string;
};

export const AuthUser = async ({
  email,
  password,
}: AuthUserRequest): Promise<AuthUserResponse> => {
  const userExists = await User.findOne({ email });
  if (!userExists) {
    throw new AppError("Incorrect email/password combination", 403);
  }

  const passwordMatch = await compare(password, userExists.password);
  if (!passwordMatch) {
    throw new AppError("Incorrect email/password combination", 403);
  }

  const { secret, expiresIn } = authConfig.jwt;

  const token = sign({}, secret, {
    subject: userExists._id.toString(),
    expiresIn,
  });

  userExists.password = "";

  return {
    user: userExists,
    token,
  };
};
