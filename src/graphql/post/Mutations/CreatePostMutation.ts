import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { Context } from "koa";
import { Post } from "../../../models/Post";
import { User } from "../../../models/User";
import { PostType, PostTypeEnum } from "../PostType";

export default mutationWithClientMutationId({
  name: "CreatePost",
  description: "Create post mutation",
  inputFields: {
    postType: { type: new GraphQLNonNull(PostTypeEnum) },
    lat: { type: new GraphQLNonNull(GraphQLString) },
    lon: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (
    { postType, lat, lon, content },
    { user }: Context
  ) => {
    if (!user.id) {
      return {
        id: null,
        success: null,
        error: "You have to be logged in to post.",
      };
    }

    const foundUser = await User.findOne({ _id: user.id });

    if (!foundUser) {
      return {
        success: null,
        error: "User not found.",
      };
    }

    const post = new Post({
      author: foundUser._id,
      postType,
      lat,
      lon,
      content,
    });

    await post.save();

    return { id: post._id, success: "Post created with success!", error: null };
  },
  outputFields: {
    post: {
      type: PostType,
      resolve: async ({ id }) => await Post.findOne({ _id: id }),
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }) => success,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
