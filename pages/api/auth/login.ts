import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";

import { supabase } from "../../../app/utils/supabase";
import { handleTokens } from "../../../utils/token/handleTokens";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const dto: { email: string; password: string } = req.body;

    const { data: userData, error } = await supabase
      .from("auth")
      .select()
      .filter("email", "eq", dto.email)
      .single();

    if (!userData) {
      res.status(403).json(error);
      return;
    }

    const isPassEquals = compare(dto.password, userData.password);

    if (!isPassEquals) {
      res.status(403).json(`Password is not fit.`);
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profile")
      .select()
      .filter("authId", "eq", userData.id)
      .single();

    if (!profileData) {
      res.status(403).json(`No profile`);
      return;
    }

    const payload = {
      email: userData.email,
      authId: userData.id,
    };

    const tokens = await handleTokens(payload);

    const data = {
      tokens,
      profile: profileData,
    };

    res.status(200).json(data);
  }
}
