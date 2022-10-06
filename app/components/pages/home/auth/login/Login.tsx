import { useForm, SubmitHandler } from "react-hook-form";
import { FC } from "react";

import { AuthService } from "../../../../../services/auth/auth.service";
import Field from "../../../../ui/form-elements/field/Field";

import styles from "./Login.module.scss";
import { ILoginFields } from "./login-fields.interface";
import { useActions } from "../../../../../hooks/store/useActions";

const Login: FC<{ handleClick: () => void }> = ({ handleClick }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginFields>({
    mode: "onChange",
  });

  const { login } = useActions();

  const onSubmit: SubmitHandler<ILoginFields> = (data) => {
    login(data);
  };

  return (
    <form className={styles.signIn} onSubmit={handleSubmit(onSubmit)}>
      <h1>Log In</h1>

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

      <button type="submit">Log In</button>

      <h2 onClick={handleClick}>
        Already have an account? <span>sign in</span>
      </h2>
    </form>
  );
};

export default Login;
