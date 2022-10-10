import { IProfile } from "../../../app/types/profile/profile.types";
import { supabase } from "../../../app/utils/supabase";
import { IUpdateProfileDto } from "./dtos/update-profile.dto";

export const ProfileService = {
  byId: async (id: number) => {
    const { data } = await supabase
      .from("profile")
      .select()
      .match({ id })
      .single();

    if (!data) return null;

    return data;
  },

  byAuthId: async (authId: number) => {
    const { data } = await supabase
      .from("profile")
      .select()
      .match({ authId })
      .single();

    if (!data) return null;

    return data;
  },

  updateProfile: async (dto: IUpdateProfileDto) => {
    const { data } = await supabase
      .from("profile")
      .update({ ...dto })
      .match({ id: dto.id });

    if (!data) return null;

    return data;
  },
};
