import { forwardRef } from "react";

import { IField } from "./field.interface";

import styles from "./Field.module.scss";

const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, error, type = "text", ...rest }, ref) => {
    return (
      <div className={styles.field}>
        <input {...rest} type={type} placeholder={placeholder} ref={ref} />

        {error && <span>{error.message}</span>}
      </div>
    );
  }
);

export default Field;
