import { profileSlice } from "./slices/profile/profile.slice";

export const rootReducer = {
  profile: profileSlice.reducer,
};
