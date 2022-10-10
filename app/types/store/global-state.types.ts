import { IPostsState } from "../../store/slices/posts/posts.interface";
import { IProfileState } from "../../store/slices/profile/profile.interface";

export interface IGlobalState {
  profile: IProfileState;
  posts: IPostsState;
}
