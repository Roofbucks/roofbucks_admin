import * as React from "react";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components";
import { ArrowRight } from "assets";
import { LogoWithText } from "components";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

export interface ResetData {
  password: string;
  confirmPassword: string;
}

const initialValues: ResetData = {
  confirmPassword: "",
  password: "",
};

export interface ResetModalProps {
  reset: (data: ResetData) => void;
  login: () => void;
}

const resetSchema = yup
  .object({
    password: yup
      .string()
      .required("Required")
      .min(8, "Password should be at least 8 characters long")
      .matches(/[A-Z]/, "Password should contain an uppercase character")
      .matches(/[a-z]/, "Password should contain an lowercase character")
      .matches(/[@$!%*?&^`/#~+={}]/, "Password should contain a special symbol")
      .matches(/[0-9]/, "Password should contain at least one number")
      .equals([yup.ref("confirmPassword")], "Passwords do not match"),
    confirmPassword: yup
      .string()
      .required("Required")
      .min(8, "Password should be at least 8 characters long")
      .matches(/[A-Z]/, "Password should contain an uppercase character")
      .matches(/[a-z]/, "Password should contain an lowercase character")
      .matches(/[@$!%*?&^`/#~+={}]/, "Password should contain a special symbol")
      .matches(/[0-9]/, "Password should contain at least one number")
      .equals([yup.ref("password")], "Passwords do not match"),
  })
  .required();

const ResetPasswordUI: React.FC<ResetModalProps> = ({
  reset,
  login,
}: ResetModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetData>({
    resolver: yupResolver(resetSchema),
    defaultValues: initialValues,
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ResetData> = (data) => reset(data);

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <LogoWithText type={"dark"} />
      </div>
      <div className={styles.body}>
        <h1 className={styles.ttl}>Reset Password</h1>
        <form className={styles.form}>
          <Input
            label="Enter Password"
            placeholder="---------"
            type="password"
            parentClassName={styles.input}
            required
            validatorMessage={errors.password?.message}
            name="password"
            register={register}
          />
          <Input
            label="Confirm Password"
            placeholder="---------"
            type="password"
            parentClassName={styles.input}
            required
            validatorMessage={errors.confirmPassword?.message}
            name="confirmPassword"
            register={register}
          />

          <ul className={styles.list}>
            Password must:
            <li>Have atleast one lower case character</li>
            <li>Have atleast one upper case character</li>
            <li>Have atleast one special symbol</li>
            <li>Have atleast one number</li>
            <li>Be atleast 8 characters</li>
          </ul>
          <Button
            className={styles.continue}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
          <Button
            onClick={() => {
              navigate(Routes.home);
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

export { ResetPasswordUI };
