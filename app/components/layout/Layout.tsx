import { FC, PropsWithChildren } from "react";
import Head from "next/head";

import styles from "./Layout.module.scss";
import Auth from "../pages/home/auth/Auth";
import { useTypedSelector } from "../../hooks/store/useTypedSelector";
import { selectProfile } from "../../store/slices/profile/profile.slice";

const Layout: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  const { profile } = useTypedSelector((state) => state.profile);

  if (!profile) return <Auth />;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
