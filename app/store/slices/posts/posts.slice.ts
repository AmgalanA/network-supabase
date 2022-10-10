import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IComment } from "../../../types/post/comment/comment.types";
import { IPost } from "../../../types/post/post.types";
import { IProfile } from "../../../types/profile/profile.types";
import { IGlobalState } from "../../../types/store/global-state.types";
import { postsActions } from "./posts.actions";
import { IPostsState } from "./posts.interface";

const initialState: IPostsState = {
  posts: [],
  isLoading: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (
      state,
      {
        payload,
      }: PayloadAction<
        {
          post: IPost;
          profile: IProfile;
          comments: {
            profile: IProfile;
            comment: IComment;
          }[];
        }[]
      >
    ) => {
      state.posts = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(HYDRATE, (state, { payload }: any) => {
        state.posts = payload.posts.posts;
      })
      .addCase(postsActions.createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postsActions.createPost.fulfilled, (state, { payload }) => {
        state.posts = [...state.posts, payload];
        state.isLoading = false;
      })
      .addCase(postsActions.createPost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postsActions.getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postsActions.getAllPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.isLoading = false;
      })
      .addCase(postsActions.getAllPosts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postsActions.sendComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postsActions.sendComment.fulfilled, (state, { payload }) => {
        state.posts = state.posts.map((post) => {
          if (post.post.id === payload.comment.postId) {
            return {
              ...post,
              comments: [...post.comments, payload],
            };
          }
          return post;
        });
        state.isLoading = false;
      })
      .addCase(postsActions.sendComment.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectPosts = (state: IGlobalState) => state.posts;

export const { setPosts } = postsSlice.actions;
