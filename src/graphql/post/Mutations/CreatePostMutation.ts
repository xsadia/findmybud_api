import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { PostTypeEnum } from "../PostType";

export default mutationWithClientMutationId({
  name: "CreatePost",
  description: "Create post mutation",
  inputFields: {
    postType: { type: new GraphQLNonNull(PostTypeEnum) },
    lat: { type: new GraphQLNonNull(GraphQLString) },
    lon: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ postType, lat, lon, content }) => {

  },
  outputFields: {},
});
