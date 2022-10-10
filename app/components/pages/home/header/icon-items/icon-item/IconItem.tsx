import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { IIconItem } from "./icon-item.interface";
import styles from "./IconItem.module.scss";

const IconItem: FC<{ item: IIconItem }> = ({ item }) => {
  const { pathname } = useRouter();

  return (
    <Link href={item.to}>
      <div
        className={`${pathname.includes(item.to) && styles.active} ${
          styles.iconItem
        }`}
      >
        <item.icon
          className={`${pathname.includes(item.to) && "text-white"} ${
            styles.con
          }`}
        />
      </div>
    </Link>
  );
};

export default IconItem;
