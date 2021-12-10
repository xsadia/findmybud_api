import { GraphQLObjectType } from "graphql";
import UserMutations from "../user/Mutations";

export const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Root of all mutations",
  fields: () => ({
    ...UserMutations,
  }),
});
