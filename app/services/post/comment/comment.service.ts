import { ICreateCommentDto } from "../../../../server/services/post/comment/dtos/create-comment.dto";
import { axiosClassic } from "../../../api/axios";
import { IComment } from "../../../types/post/comment/comment.types";

export const CommentService = {
  create: async (dto: ICreateCommentDto) => {
    const response = await axiosClassic.post<IComment>(
      `/post/comment/create`,
      dto
    );

    return response.data;
  },

  byPostId: async (postId: number) => {
    const response = await axiosClassic.get<IComment[]>(
      `/post/comment/by-post-id?postId=${postId}`
    );
    console.log("Response: ", response);

    return response.data;
  },
};
