import type { GetServerSideProps, NextPage } from "next";
import Home from "../app/components/pages/home/Home";
import { setPosts } from "../app/store/slices/posts/posts.slice";
import { wrapper } from "../app/store/store";
import { IComment } from "../app/types/post/comment/comment.types";
import { IProfile } from "../app/types/profile/profile.types";
import { LIMIT } from "../const";
import { CommentService } from "../server/services/post/comment/comment.service";
import { PostService } from "../server/services/post/post.service";
import { ProfileService } from "../server/services/profile/profile.service";

const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(({ dispatch }) => async () => {
    const response = await PostService.getAll(LIMIT);

    if (response) {
      const posts = await Promise.all(
        response.map(async (post) => {
          const profile = await ProfileService.byId(post.profileId);

          const commentsResponse = await CommentService.byPostId(post.id);

          let comments: {
            comment: IComment;
            profile: IProfile;
          }[] = [];

          if (commentsResponse) {
            comments = await Promise.all(
              commentsResponse.map(async (comment) => {
                const profile = await ProfileService.byId(comment.profileId);

                return {
                  comment,
                  profile,
                };
              })
            );
          }

          return { post, profile, comments };
        })
      );

      dispatch(setPosts(posts));
    }

    return { props: {} };
  });
