import { IComment } from "../../../../app/types/post/comment/comment.types";
import { supabase } from "../../../../app/utils/supabase";
import { ICreateCommentDto } from "./dtos/create-comment.dto";

export const CommentService = {
  create: async (dto: ICreateCommentDto) => {
    const { data, error } = await supabase
      .from("comment")
      .insert([{ ...dto }])
      .single();

    if (error) {
      return error;
    }

    return data;
  },

  byPostId: async (postId: number) => {
    const { data, error } = await supabase
      .from("comment")
      .select()
      .filter("postId", "eq", postId);

    if (error) {
      console.log(`Getting comments by id error: ${error}`);

      return null;
    }

    const comments: IComment[] = data;

    return comments;
  },
};
