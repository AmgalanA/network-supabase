import { supabase } from "../../app/utils/supabase";

export const findOne = async (refreshToken: string) => {
  const { data, error } = await supabase
    .from("token")
    .select()
    .filter("token", "eq", refreshToken)
    .single();

  if (!data) return null;

  return data;
};
