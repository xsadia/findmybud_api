import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import {
  connectionArgs,
  connectionFromArray,
  fromGlobalId,
} from "graphql-relay";
import { Post } from "../../models/Post";
import { IUser, User } from "../../models/User";
import { PostConnection } from "../post/PostType";
import { UserConnection, UserType } from "../user/UserType";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root of all queries",
  fields: () => ({
    version: {
      type: GraphQLString,
      resolve: () => "v1.0.0",
    },
    users: {
      type: UserConnection,
      args: connectionArgs,
      resolve: async (root, args, ctx) => {
        const users = await User.find();

        return connectionFromArray(users, args);
      },
    },
    me: {
      type: UserType,
      resolve: async (root, args, { user }): Promise<IUser | null> => {
        if (!user.id) {
          return null;
        }

        const me = await User.findOne({ _id: user.id });

        if (!me) {
          return null;
        }
        return me;
      },
    },
    posts: {
      type: PostConnection,
      args: connectionArgs,
      resolve: async (root, args, ctx) => {
        const posts = await Post.find().sort({ createdAt: -1 });

        return connectionFromArray(posts, args);
      },
    },
    userPosts: {
      type: PostConnection,
      args: {
        ...connectionArgs,
        userId: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (root, { userId, ...args }, ctx) => {
        const { id } = fromGlobalId(userId);
        const posts = await Post.find({ author: id }).sort({ createdAt: -1 });

        return connectionFromArray(posts, args);
      },
    },
  }),
});
