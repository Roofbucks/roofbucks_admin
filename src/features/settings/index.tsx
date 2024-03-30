import * as React from "react";
import styles from "./styles.module.css";
import { SecurityIcon, UserIcon } from "assets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components";
import { useEffect, useState } from "react";
import { patchUserNameService, userNameService } from "api";
import { useApiRequest } from "hooks/useApiRequest";

interface SettingsProps {
	account: AccountData;
	submitPassword: (data: any) => void;
	reset: boolean;
}

const SettingsUI: React.FC<SettingsProps> = ({
	submitPassword,
	reset,
	account,
}) => {
	const [view, setView] = React.useState(1);

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
		// console.log(data);
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
					<AccountForm account={account} />
				) : (
					<PasswordForm passwordData={console.log("hi")} />
				)}
			</section>
		</>
	);
};

// Account
export interface AccountData {
	firstname: string;
	lastname: string;
}

const accountSchema = yup
	.object({
		firstname: yup.string().required("Required"),
		lastname: yup.string().required("Required"),
	})
	.required();

const AccountForm = ({ account }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AccountData>({
		resolver: yupResolver(accountSchema),
		defaultValues: account,
	});

	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");

	const onSubmit: SubmitHandler<AccountData> = (data) => {
		// console.log("data");
	};
	useEffect(() => {
		setFirst(account.firstname);
		setLast(account.lastname);
	}, [account]);

	return (
		<>
			<form className={styles.accountForm}>
				<Input
					label="First Name"
					value={first}
					type="text"
					parentClassName={styles.inputWrap}
					required
					validatorMessage={errors.firstname?.message}
					name="firstname"
					register={register}
					placeholder={""}
					onChange={(e) => {
						setFirst(e.target.value);
					}}
				/>
				<Input
					label="Last Name"
					value={last}
					type="text"
					parentClassName={styles.inputWrap}
					required
					validatorMessage={errors.lastname?.message}
					name="lastname"
					register={register}
					placeholder={""}
					onChange={(e) => {
						setLast(e.target.value);
					}}
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
export interface SecurityData {
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

const PasswordForm = ({ passwordData }) => {
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
