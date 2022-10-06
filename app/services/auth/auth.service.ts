import axios from "axios";
import { axiosClassic } from "../../api/axios";
import {
  ISignInDto,
  IAuthResponse,
  ILoginDto,
} from "../../types/auth/auth.types";

export const AuthService = {
  signIn: async (dto: ISignInDto) => {
    const response = await axiosClassic.post<IAuthResponse>(
      `/auth/sign-in`,
      dto
    );

    return response.data;
  },
  login: async (dto: ILoginDto) => {
    const response = await axiosClassic.post<IAuthResponse>(`/auth/login`, dto);

    return response.data;
  },
  refresh: async (refreshToken: string) => {
    const response = await axiosClassic.post<IAuthResponse>(`/auth/refresh`, { refreshToken });

    return response.data;
  },
};
