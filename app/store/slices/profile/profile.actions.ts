import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseCookies, setCookie } from "nookies";

import { ILoginDto, ISignInDto } from "../../../types/auth/auth.types";
import { AuthService } from "../../../services/auth/auth.service";
import { IUpdateProfileDto } from "../../../../server/services/profile/dtos/update-profile.dto";
import { ProfileService } from "../../../services/profile/profile.service";

export const profileActions = {
  register: createAsyncThunk(
    "profile/register",
    async (dto: ISignInDto, thunkApi) => {
      try {
        const response = await AuthService.signIn(dto);

        setCookie(null, "accessToken", response.tokens.accessToken);
        setCookie(null, "refreshToken", response.tokens.refreshToken);

        return response;
      } catch (error) {
        console.log(`Registring user error: ${error}`);

        return thunkApi.rejectWithValue(error);
      }
    }
  ),
  login: createAsyncThunk("profile/login", async (dto: ILoginDto, thunkApi) => {
    try {
      const response = await AuthService.login(dto);

      setCookie(null, "accessToken", response.tokens.accessToken);
      setCookie(null, "refreshToken", response.tokens.refreshToken);

      return response;
    } catch (error) {
      console.log(`Logining user error: ${error}`);

      return thunkApi.rejectWithValue(error);
    }
  }),

  refresh: createAsyncThunk("profile/refresh", async (_, thunkApi) => {
    try {
      const refreshToken = parseCookies().refreshToken;

      const response = await AuthService.refresh(refreshToken);

      setCookie(null, "accessToken", response.tokens.accessToken);
      setCookie(null, "refreshToken", response.tokens.refreshToken);

      return response;
    } catch (error) {
      console.log(`Refreshing user error: ${error}`);

      return thunkApi.rejectWithValue(error);
    }
  }),

  update: createAsyncThunk(
    "profile/update",
    async (dto: IUpdateProfileDto, thunkApi) => {
      try {
        const response = await ProfileService.update(dto);

        return response;
      } catch (error) {
        console.log(`Refreshing user error: ${error}`);

        return thunkApi.rejectWithValue(error);
      }
    }
  ),
};
