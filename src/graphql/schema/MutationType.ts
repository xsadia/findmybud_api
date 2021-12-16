import { GraphQLObjectType } from "graphql";
import UserMutations from "../user/Mutations";
import PostMutations from "../post/Mutations";

export const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Root of all mutations",
  fields: () => ({
    ...UserMutations,
    ...PostMutations,
  }),
});
