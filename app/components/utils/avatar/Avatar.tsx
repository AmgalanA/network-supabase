import { FC } from "react";
import { BsUpload } from "react-icons/bs";

import styles from "./Avatar.module.scss";

const Avatar: FC<{ url?: string; width?: number; height?: number }> = ({
  url,
  width,
  height,
}) => {
  return (
    <div
      style={{
        width,
        height,
      }}
      className={styles.avatar}
    >
      {url ? (
        <img
          src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${url}`}
          alt="user-profile"
        />
      ) : (
        <div className={styles.emptyProfile}>
          <BsUpload />
        </div>
      )}
    </div>
  );
};

export default Avatar;
