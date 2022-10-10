import { FC, PropsWithChildren } from "react";

import styles from "./Modal.module.scss";

const Modal: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className={styles.modal}>{children}</div>;
};

export default Modal;
