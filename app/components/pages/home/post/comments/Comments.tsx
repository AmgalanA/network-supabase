import { FC } from "react";

import { useTypedSelector } from "../../../../../hooks/store/useTypedSelector";
import { selectProfile } from "../../../../../store/slices/profile/profile.slice";
import { IComment } from "../../../../../types/post/comment/comment.types";
import { IProfile } from "../../../../../types/profile/profile.types";
import Avatar from "../../../../utils/avatar/Avatar";
import CommentForm from "./comment-form/CommentForm";
import Comment from "./comment/Comment";
import styles from "./Comments.module.scss";

const Comments: FC<{
  postId: number;
  comments: { profile: IProfile; comment: IComment }[];
}> = ({ postId, comments }) => {
  const { profile } = useTypedSelector(selectProfile);

  return (
    <>
      <div className={styles.comments}>
        <Avatar width={50} height={50} url={profile?.avatarUrl} />

        <CommentForm postId={postId} />
      </div>
      <div className={styles.commentsWrapper}>
        {comments.map((comment) => (
          <Comment key={comment.comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default Comments;
