import { postsSlice } from "./slices/posts/posts.slice";
import { profileSlice } from "./slices/profile/profile.slice";

export const rootReducer = {
  profile: profileSlice.reducer,
  posts: postsSlice.reducer,
};
