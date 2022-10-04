import { useForm, SubmitHandler } from "react-hook-form";
import { useActions } from "../../../../../hooks/store/useActions";

import { AuthService } from "../../../../../services/auth/auth.service";
import Field from "../../../../ui/form-elements/field/Field";
import styles from "./SignIn.module.scss";
import { ISignInFields } from "./sign-in-fields.interface";

const SignIn = () => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Create user</h1>

      <Field
        placeholder="E-mail"
        type="email"
        error={errors.email}
        {...register("email", {
          required: "Please, enter an e-mail",
        })}
      />

      <Field
        placeholder="password"
        type="password"
        error={errors.password}
        {...register("password", {
          required: "Please, enter an password",
        })}
      />

      <Field
        placeholder="name"
        error={errors?.name}
        {...register("name", {
          required: "Please, enter a name",
        })}
      />

      <Field
        placeholder="secondName"
        error={errors?.secondName}
        {...register("secondName", {
          required: "Please, enter a second name",
        })}
      />

      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
