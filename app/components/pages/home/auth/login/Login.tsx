import { useForm, SubmitHandler } from "react-hook-form";
import { AuthService } from "../../../../../services/auth/auth.service";
import Field from "../../../../ui/form-elements/field/Field";

import styles from "./Login.module.scss";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ISignInFields> = async (data) => {
    const response = await AuthService.signIn(data);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>

      {/* <Field
        placeholder="E-mail"
        type="email"
        error={errors?.email}
        {...register("email", {
          required: "Please, enter an e-mail",
        })}
      />

      <Field
        placeholder="password"
        type="password"
        error={errors?.password}
        {...register("password", {
          required: "Please, enter an password",
        })}
      /> */}

      <button type="submit">Sign In</button>
    </form>
  );
};

export default Login;
