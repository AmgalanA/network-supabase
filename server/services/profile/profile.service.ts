import { supabase } from "../../../app/utils/supabase";

export const ProfileService = {
  byId: async (id: number) => {
    const response = await supabase
      .from("profile")
      .select()
      .match({ id })
      .single();

    if (!response) return null;

    return response;
  },

  byAuthId: async (authId: number) => {
    const response = await supabase
      .from("profile")
      .select()
      .match({ authId })
      .single();

    if (!response) return null;

    return response;
  },
};
