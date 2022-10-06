import { supabase } from "../../app/utils/supabase";

export const saveToken = async (authId: number, refreshToken: string) => {
  const { data: candidateToken } = await supabase
    .from("token")
    .select()
    .filter("auth_id", "eq", authId)
    .single();

  if (candidateToken) {
    const { data } = await supabase
      .from("token")
      .update({ token: refreshToken })
      .match({ auth_id: authId });

    return data;
  } else {
    const { data, error } = await supabase.from("token").insert([
      {
        token: refreshToken,
        auth_id: authId,
      },
    ]);

    return data;
  }
};
