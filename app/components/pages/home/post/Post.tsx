import { FC } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import Timeago from "react-timeago";
import { IComment } from "../../../../types/post/comment/comment.types";

import { IPost } from "../../../../types/post/post.types";
import { IProfile } from "../../../../types/profile/profile.types";
import Avatar from "../../../utils/avatar/Avatar";
import Comments from "./comments/Comments";
import styles from "./Post.module.scss";

const Post: FC<{
  post: {
    comments: { profile: IProfile; comment: IComment }[];
    post: IPost;
    profile: IProfile;
  };
}> = ({ post: { post, profile, comments } }) => {
  return (
    <div className={styles.post}>
      <header>
        <Avatar width={60} height={60} url={profile.avatarUrl} />
        <h1>
          {profile.name} {profile.secondName}
        </h1>

        <div className={styles.iconWrapper}>
          <Timeago date={post.created_at} />
          <FiMoreHorizontal className={styles.moreIcon} />
        </div>
      </header>

      <div className={styles.image}>
        <img
          src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${post.imageUrl}`}
          alt=""
        />
      </div>

      <h2>{post.caption}</h2>

      <Comments comments={comments} postId={post.id} />
    </div>
  );
};

export default Post;
