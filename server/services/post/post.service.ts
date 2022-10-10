import { IPost } from "../../../app/types/post/post.types";
import { supabase } from "../../../app/utils/supabase";
import { ICreatePostDto } from "./dtos/create-post.dto";

export const PostService = {
  create: async (dto: ICreatePostDto) => {
    const { data, error } = await supabase
      .from("post")
      .insert([
        {
          ...dto,
        },
      ])
      .single();

    if (error) return error;

    return data;
  },

  getAll: async (limit: number) => {
    const { data, error } = await supabase.from("post").select().limit(limit);

    if (error) {
      console.log(`Getting all posts error: ${error}`);

      return null;
    }

    const posts: IPost[] = data;

    return posts;
  },
};
