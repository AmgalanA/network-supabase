import { IProfile } from "../../../types/profile/profile.types";

export interface IProfileState {
  profile: IProfile | null;
  isLoading: boolean;
}
