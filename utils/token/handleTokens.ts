import jwt from "jsonwebtoken";

import { supabase } from "../../app/utils/supabase";
import { ACCESS_SECRET, REFRESH_SECRET } from "../../const";
import { saveToken } from "./saveToken";

export const handleTokens = async (payload: {
  email: string;
  authId: number;
}) => {
  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "30m",
  });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "24h",
  });

  const tokenData = await saveToken(payload.authId, refreshToken);

  return { accessToken, refreshToken };
};
