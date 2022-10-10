import { FC } from "react";
import Timeago from "react-timeago";

import { IComment } from "../../../../../../types/post/comment/comment.types";
import { IProfile } from "../../../../../../types/profile/profile.types";
import Avatar from "../../../../../utils/avatar/Avatar";

import styles from "./Comment.module.scss";

const Comment: FC<{ comment: { comment: IComment; profile: IProfile } }> = ({
  comment: { comment, profile },
}) => {
  return (
    <div className={styles.comment}>
      <Avatar width={45} height={45} url={profile.avatarUrl} />

      <div className={styles.infoWrapper}>
        <h1>
          {profile.name} {profile.secondName}
        </h1>

        <h2>{comment.text}</h2>

        <Timeago className={styles.createdAt} date={comment.created_at} />
      </div>
    </div>
  );
};

export default Comment;
