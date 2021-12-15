import { GraphQLEnumType, GraphQLObjectType, GraphQLString } from "graphql";
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  globalIdField,
} from "graphql-relay";
import { User } from "../../models/User";
import { nodeInterface } from "../node/nodeDefinition";
import { UserConnection, UserType } from "../user/UserType";

export const PostTypeEnum = new GraphQLEnumType({
  name: "post types",
  values: {
    FOUND: { value: "found" },
    LOST: { value: "lost" },
  },
});

export const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post type",
  fields: () => ({
    id: globalIdField("Post"),
    postType: {
      type: PostTypeEnum,
      resolve: ({ postType }) => postType,
    },
    author: {
      type: UserType,
      resolve: async ({ author }) => await User.findOne({ _id: author }),
    },
    location: {
      type: GraphQLString,
      resolve: ({ location }) => location,
    },
    content: {
      type: GraphQLString,
      resolve: ({ content }) => content,
    },
    likes: {
      type: UserConnection,
      args: connectionArgs,
      resolve: (post, args, context) => {
        console.log(post);
        return connectionFromArray([], args);
      },
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

const { connectionType: PostConnection, edgeType: PostEdge } =
  connectionDefinitions({
    name: "Post",
    nodeType: PostType,
  });

export { PostConnection, PostEdge };
