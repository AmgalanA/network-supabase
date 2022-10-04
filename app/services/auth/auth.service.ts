import axios from "axios";
import { axiosClassic } from "../../api/axios";
import { ISignInDto } from "../../types/auth/auth.types";

export const AuthService = {
  signIn: async (dto: ISignInDto) => {
    const response = await axiosClassic.post(`/auth/sign-in`, dto);

    return response.data;
  },
};
