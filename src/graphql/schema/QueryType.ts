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
    userById: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (root, args, ctx): Promise<IUser | null> => {
        const { id } = fromGlobalId(args.id);
        const user = await User.findOne({ _id: id });
        if (!user) {
          return null;
        }
        return user;
      },
    },
    posts: {
      type: PostConnection,
      args: connectionArgs,
      resolve: async (root, args, ctx) => {
        const posts = await Post.find();

        return connectionFromArray(posts, args);
      },
    },
  }),
});
