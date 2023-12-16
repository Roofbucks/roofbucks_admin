import * as React from "react";
import styles from "./styles.module.css";
import { SecurityIcon, UserIcon } from "assets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components";
import { changePasswordRequestData, editNameRequestData } from "api";
import { useEffect } from "react";

interface SettingsProps extends PasswordFormProps, AccountFormProps {}

const SettingsUI: React.FC<SettingsProps> = ({
  handlePassword,
  init,
  handleProfile,
}) => {
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
          <UserIcon /> Profile
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
          <AccountForm handleProfile={handleProfile} init={init} />
        ) : (
          <PasswordForm handlePassword={handlePassword} />
        )}
      </section>
    </>
  );
};

// Account
interface AccountData {
  firstName: string;
  lastName: string;
}

const initialAccountValues: AccountData = {
  firstName: "",
  lastName: "",
};

const accountSchema = yup
  .object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
  })
  .required();

interface AccountFormProps {
  handleProfile: (data: editNameRequestData) => void;
  init: AccountData;
}

const AccountForm: React.FC<AccountFormProps> = ({ init, handleProfile }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<AccountData>({
    resolver: yupResolver(accountSchema),
    defaultValues: initialAccountValues,
  });

  useEffect(() => {
    reset(init);
  }, [init]);

  const onSubmit: SubmitHandler<AccountData> = (data) => {
    handleProfile({
      firstname: data.firstName,
      lastname: data.lastName,
    });
  };

  return (
    <>
      <form className={styles.accountForm}>
        <Input
          label="First Name"
          placeholder="e.g. Jane"
          type="text"
          parentClassName={styles.inputWrap}
          required
          validatorMessage={errors.firstName?.message}
          name="firstName"
          register={register}
        />
        <Input
          label="Last Name"
          placeholder="e.g. Doe"
          type="text"
          parentClassName={styles.inputWrap}
          required
          validatorMessage={errors.lastName?.message}
          name="lastName"
          register={register}
        />
        <div className={styles.btnWrap}>
          <Button
            disabled={!isDirty}
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
