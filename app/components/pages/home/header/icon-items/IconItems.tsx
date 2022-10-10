import { AiFillMessage, AiFillHome, AiFillHeart } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { useMemo } from "react";

import { useTypedSelector } from "../../../../../hooks/store/useTypedSelector";
import { selectProfile } from "../../../../../store/slices/profile/profile.slice";
import Loading from "../../../../utils/loading/Loading";
import IconItem from "./icon-item/IconItem";

import styles from "./IconItems.module.scss";

const IconItems = () => {
  const { profile } = useTypedSelector(selectProfile);

  if (!profile) return <Loading />;

  const iconItems = useMemo(
    () => [
      {
        icon: AiFillHome,
        to: `/`,
      },
      {
        icon: AiFillMessage,
        to: `/messanger/${profile.id}`,
      },
      {
        icon: FaUserFriends,
        to: `/friends/${profile.id}`,
      },
      {
        icon: AiFillHeart,
        to: `/likes/${profile.id}`,
      },
    ],
    []
  );

  return (
    <div className={styles.iconItems}>
      {iconItems.map((item) => (
        <IconItem key={item.to} item={item} />
      ))}
    </div>
  );
};

export default IconItems;
