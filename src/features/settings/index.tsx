import * as React from "react";
import styles from "./styles.module.css";
import { SecurityIcon, UserIcon } from "assets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components";
import { useEffect, useState } from "react";

interface SettingsProps {
  account: AccountData;
  submitPassword: (data) => void;
  reset: boolean;
  updateName: (data) => void;
}

const SettingsUI: React.FC<SettingsProps> = ({
  submitPassword,
  reset,
  account,
  updateName,
}) => {
  const [view, setView] = useState(1);

  const {
    register: registerAccount,
    handleSubmit: handleSubmitAccount,
    formState: { errors: errorsAccount },
  } = useForm<AccountData>({
    resolver: yupResolver(accountSchema),
    defaultValues: account,
  });

  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    formState: { errors: errorsSecurity },
    reset: resetSecurity,
  } = useForm<SecurityData>({
    resolver: yupResolver(securitySchema),
    defaultValues: initialSecurityValues,
  });

  React.useEffect(() => {
    resetSecurity();
  }, [reset]);

  const onSubmitAccount: SubmitHandler<AccountData> = (data) => {
    updateName({
      firstname: data.firstName,
      lastname: data.lastName,
    });
  };

  const onSubmitSecurity: SubmitHandler<SecurityData> = (data) => {
    submitPassword({
      current_password: data.currentPassword,
      new_password: data.newPassword,
    });
  };

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
          <AccountForm account={account} changeName={onSubmitAccount} />
        ) : (
          <PasswordForm onSubmitSecurity={onSubmitSecurity} />
        )}
      </section>
    </>
  );
};

// Account
export interface AccountData {
  firstName: string;
  lastName: string;
}

export interface AccountProps {
  changeName: (data: AccountData) => void;
  account: {
    firstName: string;
    lastName: string;
  };
}

const accountSchema = yup
  .object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
  })
  .required();

const AccountForm: React.FC<AccountProps> = ({
  account,
  changeName,
}: AccountProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<AccountData>({
    resolver: yupResolver(accountSchema),
    defaultValues: account,
  });
  const onSubmit: SubmitHandler<AccountData> = (data) => {
    return changeName(data);
  };

  useEffect(() => {
    reset(account);
  }, [account]);

  return (
    <>
      <form className={styles.accountForm}>
        <Input
          label="First Name"
          placeholder="e.g. Dwayne"
          type="text"
          parentClassName={styles.inputWrap}
          required
          validatorMessage={errors.firstName?.message}
          name="firstName"
          register={register}
        />
        <Input
          label="Last Name"
          placeholder="e.g. Johnson"
          type="text"
          parentClassName={styles.inputWrap}
          required
          validatorMessage={errors.lastName?.message}
          name="lastName"
          register={register}
        />
        <div className={styles.btnWrap}>
          <Button
            className={styles.btn}
            onClick={handleSubmit(onSubmit)}
            type="primary"
            disabled={!isDirty}
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
    newPassword: passwordSchema.equals(
      [yup.ref("confirmPassword")],
      "Passwords do not match"
    ),
    confirmPassword: passwordSchema.equals(
      [yup.ref("newPassword")],
      "Passwords do not match"
    ),
  })
  .required();

const PasswordForm: React.FC<{
  onSubmitSecurity: SubmitHandler<SecurityData>;
}> = ({ onSubmitSecurity }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SecurityData>({
    resolver: yupResolver(securitySchema),
    defaultValues: initialSecurityValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: SecurityData) => {
    onSubmitSecurity(data);
    setIsSubmitting(true);
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
            type="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
};

export { SettingsUI };
