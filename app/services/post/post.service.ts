import { ICreatePostDto } from "../../../server/services/post/dtos/create-post.dto";
import { axiosClassic } from "../../api/axios";
import { IPost } from "../../types/post/post.types";

export const PostService = {
  async createPost(dto: ICreatePostDto) {
    const response = await axiosClassic.post<IPost>(`/post/create`, dto);

    return response.data;
  },

  async getAll(limit: number) {
    const response = await axiosClassic.get<IPost[]>(
      `/post/get-all?limit=${limit}`
    );

    return response.data;
  },
};
