import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { supabase } from "../../../app/utils/supabase";
import { handleTokens } from "../../../utils/token/handleTokens";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const dto = req.body;

    const hashPassword = await bcrypt.hash(dto.password, 5);

    const { data, error } = await supabase
      .from("auth")
      .insert([
        {
          email: dto.email,
          password: hashPassword,
        },
      ])
      .single();

    const { data: profileData, error: profileError } = await supabase
      .from("profile")
      .insert([
        {
          name: dto.name,
          secondName: dto.secondName,
          authId: data.id,
        },
      ])
      .single();

    const payload = {
      email: dto.email,
      authId: data.id,
    };

    const tokens = await handleTokens(payload);

    const responseData = {
      tokens,
      profile: profileData,
    };

    res.status(200).json(responseData);
  }
}
