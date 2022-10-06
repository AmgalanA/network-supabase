import { FC, PropsWithChildren } from "react";
import Head from "next/head";

import styles from "./Layout.module.scss";
import Auth from "../pages/home/auth/Auth";
import { useTypedSelector } from "../../hooks/store/useTypedSelector";
import Loading from "../utils/loading/Loading";
import { useAuth } from "../../hooks/auth/useAuth";

const Layout: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  const { profile, isLoading } = useTypedSelector((state) => state.profile);

  const auth = useAuth();

  if (isLoading) return <Loading />;

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
