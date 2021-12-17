import { GraphQLObjectType, GraphQLString } from "graphql";
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  globalIdField,
} from "graphql-relay";
import { Post } from "../../models/Post";
import { nodeInterface } from "../node/nodeDefinition";
import { PostConnection } from "../post/PostType";

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: globalIdField("User"),
    username: {
      type: GraphQLString,
      resolve: ({ username }) => username,
    },
    email: {
      type: GraphQLString,
      resolve: ({ email }) => email,
    },
    password: {
      type: GraphQLString,
      resolve: ({ password }) => password,
    },
    bio: {
      type: GraphQLString,
      resolve: ({ bio }) => bio,
    },
    posts: {
      type: PostConnection,
      args: connectionArgs,
      resolve: async (user, args, ctx) => {
        const posts = await Post.find({ author: user.id }).sort("-createdAt");

        return connectionFromArray(posts, args);
      },
    },
    refreshToken: {
      type: GraphQLString,
      resolve: ({ refreshToken }) => refreshToken,
    },
    createdAt: {
      type: GraphQLString,
      resolve: ({ createdAt }) => createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: ({ updatedAt }) => updatedAt,
    },
  }),
  interfaces: () => [nodeInterface],
});

const { connectionType: UserConnection, edgeType: UserEdge } =
  connectionDefinitions({
    name: "User",
    nodeType: UserType,
  });

export { UserConnection, UserEdge };
