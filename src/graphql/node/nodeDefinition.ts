import { fromGlobalId, nodeDefinitions } from "graphql-relay";
import { Post } from "../../models/Post";
import { User } from "../../models/User";
import { PostType } from "../post/PostType";
import { UserType } from "../user/UserType";

export const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  async (globalId) => {
    const { id, type } = fromGlobalId(globalId);

    if (type === "User") {
      return await User.findOne({ _id: id });
    }

    if (type === "Post") {
      return await Post.findOne({ _id: id });
    }

    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return UserType;
    }

    if (obj instanceof Post) {
      return PostType;
    }
  }
);
