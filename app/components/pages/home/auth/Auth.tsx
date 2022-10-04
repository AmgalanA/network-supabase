import { useState } from "react";

import styles from "./Auth.module.scss";
import Login from "./login/Login";
import SignIn from "./sign-in/SignIn";

const Auth = () => {
  const [type, setType] = useState<"sign-in" | "login">("sign-in");

  return <div className={styles.auth}>
    {type === "login" ? <Login /> : <SignIn />}</div>;
};

export default Auth;
