import { IComment } from "../../../types/post/comment/comment.types";
import { IPost } from "../../../types/post/post.types";
import { IProfile } from "../../../types/profile/profile.types";

export interface IPostsState {
  posts: {
    post: IPost;
    profile: IProfile;
    comments: {
      profile: IProfile;
      comment: IComment;
    }[];
  }[];
  isLoading: boolean;
}
