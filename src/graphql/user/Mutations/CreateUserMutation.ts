import { hash } from "bcryptjs";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { sign } from "jsonwebtoken";
import { authConfig } from "../../../config/jwtConfig";
import { User } from "../../../models/User";
import { UserType } from "../UserType";

export default mutationWithClientMutationId({
  name: "CreateUser",
  description: "Create user mutation",
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ email, username, password }) => {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return { id: null, token: null, error: "E-mail already in use" };
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return { id: null, token: null, error: "Username already in use" };
    }

    const hashedPassword = await hash(password, 8);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user._id.toString(),
      expiresIn,
    });

    return {
      id: user._id,
      token,
      error: null,
    };
  },
  outputFields: {
    me: {
      type: UserType,
      resolve: async ({ id }) => await User.findOne({ _id: id }),
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
