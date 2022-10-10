import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { useTypedSelector } from "../../../../../hooks/store/useTypedSelector";
import { selectProfile } from "../../../../../store/slices/profile/profile.slice";
import Avatar from "../../../../utils/avatar/Avatar";

import styles from "./UserProfile.module.scss";

const UserProfile: FC = () => {
  const { push } = useRouter();

  const { profile } = useTypedSelector(selectProfile);

  const goToUpdatePage = useCallback(() => {
    push(`/profile/update`);
  }, [push]);

  return (
    <div className={styles.userProfile}>
      <div onClick={goToUpdatePage}>
        <Avatar url={profile?.avatarUrl} />
      </div>

      <h1>
        {profile?.name} {profile?.secondName}
      </h1>

      <IoIosArrowDown />
    </div>
  );
};

export default UserProfile;
