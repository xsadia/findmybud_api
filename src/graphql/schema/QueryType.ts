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
    health: {
      type: GraphQLString,
      resolve: () => "Healthy",
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
    userPosts: {
      type: PostConnection,
      args: connectionArgs,
      resolve: async (root, args, { user }) => {
        if (!user.id) {
          return null;
        }

        const posts = await Post.find({ author: user.id }).sort("-createdAt");

        return connectionFromArray(posts, args);
      },
    },
  }),
});
