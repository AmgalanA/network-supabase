import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import { FC } from "react";

import { useActions } from "../../../../../../hooks/store/useActions";
import { useTypedSelector } from "../../../../../../hooks/store/useTypedSelector";
import { selectProfile } from "../../../../../../store/slices/profile/profile.slice";

import styles from "./CommentForm.module.scss";

const CommentForm: FC<{ postId: number }> = ({ postId }) => {
  const { profile } = useTypedSelector(selectProfile);

  const {
    register,
    formState: {
      errors: { text: textError },
    },
    setValue,
    handleSubmit,
  } = useForm<{ text: string }>({
    mode: "onChange",
  });

  const { sendComment } = useActions();

  const onSubmit: SubmitHandler<{ text: string }> = ({ text }) => {
    if (!profile) return;

    const dto = {
      postId,
      profileId: profile.id,
      text,
    };

    sendComment(dto);

    setValue("text", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.commentForm}>
      <input
        {...register("text", {
          required: "Please enter some text",
        })}
        type="text"
        placeholder="Add commentar..."
      />

      <button type="submit" disabled={!profile}>
        <AiOutlineSend className={styles.sendIcon} />
      </button>

      {textError && <span>{textError.message}</span>}
    </form>
  );
};

export default CommentForm;
