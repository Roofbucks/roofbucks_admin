import * as React from "react";
import styles from "./styles.module.css";
import { SecurityIcon, UserIcon } from "assets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components";
import { changePasswordRequestData } from "api";

interface SettingsProps extends PasswordFormProps {
  // account: AccountData;
  reset: boolean;
}

const SettingsUI: React.FC<SettingsProps> = ({ handlePassword, reset }) => {
  const [view, setView] = React.useState(1);
  return (
    <>
      <h1 className={styles.ttl}>Settings</h1>
      <nav className={styles.nav}>
        <span
          onClick={() => setView(1)}
          role="button"
          className={view === 1 ? styles.activeNav : ""}
        >
          <UserIcon /> Account
        </span>
        <span
          onClick={() => setView(2)}
          role="button"
          className={view === 2 ? styles.activeNav : ""}
        >
          <SecurityIcon /> Security
        </span>
      </nav>
      <section className={styles.formWrap}>
        {view === 1 ? (
          <AccountForm />
        ) : (
          <PasswordForm handlePassword={handlePassword} />
        )}
      </section>
    </>
  );
};

// Account
interface AccountData {
  name: string;
  email: string;
}

const initialAccountValues: AccountData = {
  name: "",
  email: "",
};

const accountSchema = yup
  .object({
    name: yup.string().required("Required"),
    email: yup.string().required("Required").email("Enter a valid email"),
  })
  .required();

const AccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountData>({
    resolver: yupResolver(accountSchema),
    defaultValues: initialAccountValues,
  });

  const onSubmit: SubmitHandler<AccountData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form className={styles.accountForm}>
        <Input
          label="Name"
          placeholder="e.g. Jane"
          type="text"
          parentClassName={styles.inputWrap}
          required
          validatorMessage={errors.name?.message}
          name="name"
          register={register}
        />
        <Input
          label="Email address"
          placeholder="e.g. jane@roofbucks.com"
          type="email"
          parentClassName={styles.inputWrap}
          required
          validatorMessage={errors.email?.message}
          name="email"
          register={register}
        />
        <div className={styles.btnWrap}>
          <Button
            className={styles.btn}
            onClick={handleSubmit(onSubmit)}
            type="primary"
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

// Security
interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialSecurityValues: SecurityData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const passwordSchema = yup
  .string()
  .required("Required")
  .min(8, "Password should be at least 8 characters long")
  .matches(/[A-Z]/, "Password should contain an uppercase character")
  .matches(/[a-z]/, "Password should contain an lowercase character")
  .matches(/[0-9]/, "Password should contain at least one number");

const securitySchema = yup
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema.matches(
      /@|#|&|\$]/,
      "Password should contain at least special character (e.g. @, #, &, $)"
    ),
    confirmPassword: passwordSchema.equals(
      [yup.ref("newPassword")],
      "Passwords do not match"
    ),
  })
  .required();

interface PasswordFormProps {
  handlePassword: (data: changePasswordRequestData) => void;
}
const PasswordForm: React.FC<PasswordFormProps> = ({ handlePassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SecurityData>({
    resolver: yupResolver(securitySchema),
    defaultValues: initialSecurityValues,
  });

  const onSubmit: SubmitHandler<SecurityData> = (data) => {
    handlePassword({
      current_password: data.currentPassword,
      new_password: data.newPassword,
    });
    reset();
  };

  return (
    <>
      <form className={styles.securityForm}>
        <Input
          label="CURRENT PASSWORD *"
          placeholder="********"
          type="password"
          parentClassName={styles.inputWrap}
          required
          validatorMessage={errors.currentPassword?.message}
          name="currentPassword"
          register={register}
        />
        <Input
          label="NEW PASSWORD *"
          placeholder="********"
          type="password"
          parentClassName={styles.inputWrap}
          required
          validatorMessage={errors.newPassword?.message}
          name="newPassword"
          register={register}
        />
        <Input
          label="CONFIRM PASSWORD *"
          placeholder="********"
          type="password"
          parentClassName={styles.inputWrap}
          required
          validatorMessage={errors.confirmPassword?.message}
          name="confirmPassword"
          register={register}
        />
        <div className={styles.btnWrap}>
          <Button
            className={styles.btn}
            onClick={handleSubmit(onSubmit)}
            type="primary"
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export { SettingsUI };
