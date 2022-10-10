import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";

import { useUpload } from "../../../../../hooks/file/useUpload";
import { useActions } from "../../../../../hooks/store/useActions";
import { useTypedSelector } from "../../../../../hooks/store/useTypedSelector";
import { selectProfile } from "../../../../../store/slices/profile/profile.slice";
import Field from "../../../../ui/form-elements/field/Field";
import Loading from "../../../../utils/loading/Loading";
import Modal from "../../../../utils/modal/Modal";
import UploadImage from "../../../../utils/modal/upload-image/UploadImage";

import styles from "./UploadPostModal.module.scss";

const UploadPostModal: FC<{ handleClick: () => void }> = ({ handleClick }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { profile } = useTypedSelector(selectProfile);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<{ caption: string }>({
    mode: "onChange",
  });

  const { clear, click, handleChange, upload, file, ref } = useUpload();

  const { createPost } = useActions();

  const onSubmit: SubmitHandler<{ caption: string }> = async ({ caption }) => {
    if (!file.file || !profile) return;

    try {
      setIsLoading(true);
      const imageData: any = await upload();

      if (imageData) {
        const dto = {
          caption,
          profileId: profile.id,
          imageUrl: imageData,
        };

        createPost(dto);
      }

      setValue("caption", "");
      handleClick();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal>
      {isLoading ? (
        <Loading />
      ) : (
        <form
          className={styles.uploadPostForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <IoIosClose className={styles.closeIcon} onClick={handleClick} />
          <h1>Create Post</h1>

          <Field
            {...register("caption", {
              required: "Please enter a caption",
            })}
            error={errors.caption}
            placeholder="Enter caption..."
          />
          <input
            accept="image/*"
            type="file"
            hidden
            ref={ref}
            onChange={handleChange}
          />

          <UploadImage url={file.url} clear={clear} click={click} />

          <button disabled={!file.file}>Upload Post</button>
        </form>
      )}
    </Modal>
  );
};

export default UploadPostModal;
