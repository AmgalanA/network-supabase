import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICreateCommentDto } from "../../../../server/services/post/comment/dtos/create-comment.dto";
import { ICreatePostDto } from "../../../../server/services/post/dtos/create-post.dto";
import { CommentService } from "../../../services/post/comment/comment.service";
import { PostService } from "../../../services/post/post.service";
import { ProfileService } from "../../../services/profile/profile.service";

export const postsActions = {
  createPost: createAsyncThunk(
    "post/create",
    async (dto: ICreatePostDto, thunkApi) => {
      try {
        const response = await PostService.createPost(dto);

        const profile = await ProfileService.byId(response.profileId);

        return { post: response, profile, comments: [] };
      } catch (error) {
        console.log(`Creating post error: ${error}`);

        return thunkApi.rejectWithValue(error);
      }
    }
  ),

  getAllPosts: createAsyncThunk(
    "post/get-all",
    async (limit: number, thunkApi) => {
      try {
        const response = await PostService.getAll(limit);

        const posts = await Promise.all(
          response.map(async (post) => {
            const profile = await ProfileService.byId(post.profileId);

            const commentsResponse = await CommentService.byPostId(post.id);

            const comments = await Promise.all(
              commentsResponse.map(async (comment) => {
                const profile = await ProfileService.byId(comment.profileId);

                return { comment, profile };
              })
            );

            return { post, profile, comments };
          })
        );

        return posts;
      } catch (error) {
        console.log(`Getting all posts error: ${error}`);

        return thunkApi.rejectWithValue(error);
      }
    }
  ),

  sendComment: createAsyncThunk(
    "post/send-comment",
    async (dto: ICreateCommentDto, thunkApi) => {
      try {
        const response = await CommentService.create(dto);

        const profile = await ProfileService.byId(response.profileId);

        return { comment: response, profile };
      } catch (error) {
        console.log(`Creating comment error: ${error}`);

        return thunkApi.rejectWithValue(error);
      }
    }
  ),
};
