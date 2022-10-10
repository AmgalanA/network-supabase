import { AiOutlineUpload } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";

import { useTypedSelector } from "../../../hooks/store/useTypedSelector";
import { selectProfile } from "../../../store/slices/profile/profile.slice";
import Layout from "../../layout/Layout";
import Field from "../../ui/form-elements/field/Field";
import { IUpdateFields } from "./update-fields.interface";
import styles from "./Update.module.scss";
import { useUpload } from "../../../hooks/file/useUpload";
import { useActions } from "../../../hooks/store/useActions";
import { IUpdateProfileDto } from "../../../../server/services/profile/dtos/update-profile.dto";

const Update = () => {
  const { profile } = useTypedSelector(selectProfile);

  const { register, handleSubmit } = useForm<IUpdateFields>({
    mode: "onChange",
  });

  const { click, clear, file, handleChange, upload, ref } = useUpload();

  const { update } = useActions();

  const onSubmit: SubmitHandler<IUpdateFields> = async (data) => {
    if (!profile) return;

    const dto = {
      id: profile.id,
      name: profile.name,
      secondName: profile.secondName,
      avatarUrl: profile.avatarUrl,
    } as IUpdateProfileDto;

    if (file.file) {
      const avatarUrl = await upload();

      dto.avatarUrl = avatarUrl;
    }
    if (data.name) dto.name = data.name;
    if (data.secondName) dto.secondName = data.secondName;

    update(dto);
  };

  return (
    <Layout title="Update">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.update}>
        <div className={styles.fieldWrapper}>
          <span>Current: {profile?.name}</span>
          <Field placeholder="Name" {...register("name")} />
        </div>
        <div className={styles.fieldWrapper}>
          <span>Current: {profile?.secondName}</span>
          <Field placeholder="Second Name" {...register("secondName")} />
        </div>

        {!file.url ? (
          <div className={styles.uploadAvatar}>
            <h2>Upload Avatar: </h2>
            <AiOutlineUpload onClick={click} className={styles.updateIcon} />
            <input type="file" hidden ref={ref} onChange={handleChange} />
          </div>
        ) : (
          <div className={styles.image}>
            <IoIosClose onClick={clear} className={styles.closeIcon} />
            <img src={file.url} alt="selected-file" />
          </div>
        )}

        <button type="submit" className={styles.updateButton}>
          Update
        </button>
      </form>
    </Layout>
  );
};

export default Update;
