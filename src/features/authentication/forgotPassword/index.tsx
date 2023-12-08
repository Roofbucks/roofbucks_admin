import * as React from "react";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, LogoWithText } from "components";
import { ArrowRight } from "assets";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

interface RecoveryData {
  email: string;
}

const initialValues: RecoveryData = {
  email: "",
};

export interface RecoveryModalProps {
  recovery: (data: RecoveryData) => void;
  login: () => void;
  clear: boolean;
}

const RecoverySchema = yup
  .object({
    email: yup.string().email("Enter a valid email").required("Required"),
  })
  .required();

const ForgotPasswordUI: React.FC<RecoveryModalProps> = ({
  recovery,
  login,
  clear,
}: RecoveryModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecoveryData>({
    resolver: yupResolver(RecoverySchema),
    defaultValues: initialValues,
  });

  React.useEffect(() => {
    reset();
  }, [clear]);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RecoveryData> = (data) => recovery(data);

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <LogoWithText type={"dark"} />
      </div>
      <div className={styles.body}>
        <h1 className={styles.ttl}>Account Recovery</h1>
        <form className={styles.form}>
          <Input
            label="Email Address"
            placeholder="e.g. user@gmail.com"
            type="email"
            parentClassName={styles.input}
            required
            validatorMessage={errors.email?.message}
            name="email"
            register={register}
          />
          <p className={styles.info}>
            Enter your recovery email address with which you will recieve an OTP
          </p>
          <Button
            className={styles.continue}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
          <Button
            onClick={() => {
              login();
            }}
            type="tertiary"
            className={styles.back} 
          >
            <ArrowRight /> Back to login
          </Button>
        </form>
      </div>
    </div>
  );
};

export { ForgotPasswordUI };
