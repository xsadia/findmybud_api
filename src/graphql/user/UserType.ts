import { GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { nodeInterface } from "../node/nodeDefinition";

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
  interfaces: () => [nodeInterface]
});

const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
  name: "User",
  nodeType: UserType
});

export { UserConnection, UserEdge };