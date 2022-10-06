import { IProfile } from "../profile/profile.types";

export interface ISignInDto {
  email: string;
  password: string;
  name: string;
  secondName: string;
}

export interface ILoginDto extends Pick<ISignInDto, "email" | "password"> {}

export interface IAuthResponse {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  profile: IProfile;
}
