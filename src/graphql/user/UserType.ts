import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (user) => user.id,
    },
    username: {
      type: GraphQLString,
      resolve: (user) => user.username,
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    password: {
      type: GraphQLString,
      resolve: (user) => user.password,
    },
    bio: {
      type: GraphQLString,
      resolve: (user) => user.bio,
    },
    refreshToken: {
      type: GraphQLString,
      resolve: (user) => user.refreshToken,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (user) => user.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (user) => user.updatedAt,
    },
  }),
});
