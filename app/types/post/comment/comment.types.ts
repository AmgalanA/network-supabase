import { IProfile } from "../../profile/profile.types";

export interface IComment {
  id: number;
  text: string;
  postId: number;
  profileId: number;
  profile: IProfile;
  created_at: string;
}
