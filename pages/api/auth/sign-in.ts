import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { ISignInDto } from "../../../app/types/auth/auth.types";
import { supabase } from "../../../app/utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const dto = req.body;
    console.log(dto);

    const hashPassword = bcrypt.hash(dto.password, 5);

    const { data, error } = await supabase
      .from("auth")
      .insert([
        {
          email: dto.email,
          password: hashPassword,
        },
      ])
      .single();

    console.log("Registring error: ", error);

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
    console.log("Profile error: ", profileError);

    res.status(200).json(profileData);
  }
}
