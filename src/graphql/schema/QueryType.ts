import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { IUser, User } from "../../models/User";
import { UserType } from "../user/UserType";

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root of all queries",
  fields: () => ({
    health: {
      type: GraphQLString,
      resolve: () => "Healthy",
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (): Promise<Array<IUser>> => {
        const users = await User.find();
        return users;
      },
    },
  }),
});
