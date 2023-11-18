import * as React from "react";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, LogoWithText } from "components";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

interface LoginData {
	email: string;
	password: string;
}

const initialValues: LoginData = {
	email: "",
	password: "",
};

export interface LoginModalProps {
	login: (data: LoginData) => void;
	forgotPassword: () => void;
}

const loginSchema = yup
	.object({
		email: yup
			.string()
			.required("Required")
			.email("Enter a valid email"),
		password: yup.string().required("Required"),
	})
	.required();

const LoginUI: React.FC<LoginModalProps> = ({
	login,
	forgotPassword,
}: LoginModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>({
		resolver: yupResolver(loginSchema),
		defaultValues: initialValues,
	});

	const onSubmit: SubmitHandler<LoginData> = (data) => login(data);
	

	const navigate = useNavigate();

	return (
		<div className={styles.page}>
			<div className={styles.head}>
				<LogoWithText type={"dark"} />
			</div>
			<div className={styles.body}>
				<h1 className={styles.ttl}>Login</h1>
				<form className={styles.form}>
					<Input
						label="Email"
						placeholder="e.g. user@email.com"
						type="email"
						parentClassName={styles.input}
						required
						validatorMessage={errors.email?.message}
						name="email"
						register={register}
					/>
					<Input
						label="Enter Password"
						placeholder="*********"
						type="password"
						parentClassName={styles.input}
						required
						validatorMessage={errors.password?.message}
						name="password"
						register={register}
					/>
					<button
						onClick={(e) => {
							e.preventDefault();
							navigate(Routes.forgotPassword);
							forgotPassword();
						}}
						className={styles.forgotPassword}
					>
						Forgot Password?
					</button>
					<Button
						className={styles.continue}
						type="primary"
						onClick={handleSubmit(onSubmit)}
					>
						Continue
					</Button>
				</form>
			</div>
		</div>
	);
};

export { LoginUI };
