import { compare } from "bcryptjs";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { sign } from "jsonwebtoken";
import { authConfig } from "../../../config/jwtConfig";
import { User } from "../../../models/User";
import { UserType } from "../UserType";

export default mutationWithClientMutationId({
  name: "LoginUser",
  description: "Login user mutation",
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ email, password }) => {
    const emailExists = await User.findOne({ email });

    if (!emailExists) {
      return {
        id: null,
        token: null,
        error: "Wrong e-mail/password combination",
      };
    }

    const passwordMatch = await compare(password, emailExists.password);

    if (!passwordMatch) {
      return {
        id: null,
        token: null,
        error: "Wrong e-mail/password combination",
      };
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: emailExists._id.toString(),
      expiresIn,
    });

    return { id: emailExists._id, token, error: null };
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
