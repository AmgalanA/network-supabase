import { postsActions } from "./slices/posts/posts.actions";
import { profileActions } from "./slices/profile/profile.actions";

export const rootAction = {
  ...profileActions,
  ...postsActions,
};
