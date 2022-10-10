import { IUpdateProfileDto } from "../../../server/services/profile/dtos/update-profile.dto";
import { axiosClassic } from "../../api/axios";
import { IProfile } from "../../types/profile/profile.types";

export const ProfileService = {
  byId: async (id: number) => {
    const response = await axiosClassic.get<IProfile>(
      `/profile/get-one?id=${id}`
    );

    return response.data;
  },

  update: async (dto: IUpdateProfileDto) => {
    const response = await axiosClassic.put<IProfile>(`/profile/update`, dto);

    return response.data;
  },
};
