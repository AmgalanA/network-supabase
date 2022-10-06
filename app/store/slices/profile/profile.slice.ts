import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { IProfileState } from "./profile.interface";
import { IGlobalState } from "../../../types/store/global-state.types";
import { profileActions } from "./profile.actions";

const initialState: IProfileState = {
  profile: null,
  isLoading: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, { payload }: any) => {
        state.profile = payload.post.profile;
      })
      .addCase(profileActions.register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profileActions.register.fulfilled, (state, { payload }) => {
        state.profile = payload.profile;
        state.isLoading = false;
      })
      .addCase(profileActions.register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(profileActions.login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profileActions.login.fulfilled, (state, { payload }) => {
        state.profile = payload.profile;
        state.isLoading = false;
      })
      .addCase(profileActions.login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(profileActions.refresh.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(profileActions.refresh.fulfilled, (state, { payload }) => {
        state.profile = payload.profile;
        state.isLoading = false;
      })
      .addCase(profileActions.refresh.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectProfile = (state: IGlobalState) => state.profile;
