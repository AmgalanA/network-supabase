import { useState, useCallback } from "react";

import styles from "./Auth.module.scss";
import Login from "./login/Login";
import SignIn from "./sign-in/SignIn";

const Auth = () => {
  const [type, setType] = useState<"sign-in" | "login">("sign-in");

  const handleClick = useCallback(() => {
    setType((prev) => (prev === "sign-in" ? "login" : "sign-in"));
  }, [setType]);

  return (
    <div className={styles.auth}>
      {type === "login" ? (
        <Login handleClick={handleClick} />
      ) : (
        <SignIn handleClick={handleClick} />
      )}
    </div>
  );
};

export default Auth;
