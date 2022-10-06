import { useForm, SubmitHandler } from "react-hook-form";
import { FC } from "react";

import { useActions } from "../../../../../hooks/store/useActions";
import Field from "../../../../ui/form-elements/field/Field";
import styles from "./SignIn.module.scss";
import { ISignInFields } from "./sign-in-fields.interface";

const SignIn: FC<{ handleClick: () => void }> = ({ handleClick }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInFields>({
    mode: "onChange",
  });

  const { register: registerAction } = useActions();

  const onSubmit: SubmitHandler<ISignInFields> = async (data) => {
    registerAction(data);
  };

  return (
    <form className={styles.signIn} onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>

      <Field
        placeholder="E-mail"
        type="email"
        error={errors.email}
        {...register("email", {
          required: "Please, enter an e-mail",
        })}
      />

      <Field
        placeholder="Password"
        type="password"
        error={errors.password}
        {...register("password", {
          required: "Please, enter an password",
        })}
      />

      <Field
        placeholder="Name"
        error={errors?.name}
        {...register("name", {
          required: "Please, enter a name",
        })}
      />

      <Field
        placeholder="Second Name"
        error={errors?.secondName}
        {...register("secondName", {
          required: "Please, enter a second name",
        })}
      />

      <button type="submit">Sign In</button>

      <h2 onClick={handleClick}>
        Already have an account? <span>log in</span>
      </h2>
    </form>
  );
};

export default SignIn;
