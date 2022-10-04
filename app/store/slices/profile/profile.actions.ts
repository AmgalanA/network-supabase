import { createAsyncThunk } from "@reduxjs/toolkit";

import { ISignInDto } from "../../../types/auth/auth.types";
import { AuthService } from "../../../services/auth/auth.service";

export const profileActions = {
  register: createAsyncThunk(
    "profile/register",
    async (dto: ISignInDto, thunkApi) => {
      try {
        const response = await AuthService.signIn(dto);

        return response;
      } catch (error) {
        console.log(`Registring user error: ${error}`);

        return thunkApi.rejectWithValue(error);
      }
    }
  ),
};
