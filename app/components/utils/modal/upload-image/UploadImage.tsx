import { AiOutlineUpload } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { FC } from "react";

import styles from "./UploadImage.module.scss";
import { IUploadImageProps } from "./upload-image.interface";

const UploadImage: FC<IUploadImageProps> = ({ url, clear, click }) => {
  return (
    <div className={styles.uploadImage}>
      {url ? (
        <div className={styles.imageWrapper}>
          <img src={url} alt="selected-image" />
          <IoIosClose onClick={clear} className={styles.closeIcon} />
        </div>
      ) : (
        <>
          <AiOutlineUpload onClick={click} className={styles.uploadIcon} />
          <h1>Upload Image</h1>
        </>
      )}
    </div>
  );
};

export default UploadImage;
