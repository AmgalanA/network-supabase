import { ISignInFields } from "../sign-in/sign-in-fields.interface";

export interface ILoginFields
  extends Pick<ISignInFields, "email" | "password"> {}
