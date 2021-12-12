import { mutationWithClientMutationId } from "graphql-relay";

export default mutationWithClientMutationId({
  name: "CreatePost",
  description: "Create post mutation",
  inputFields: {},
  mutateAndGetPayload: () => {},
  outputFields: {},
});
