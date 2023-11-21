import { forgotPasswordData, forgotPasswordService } from "api";
import { ForgotPasswordUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const ForgotPassword = () => {
	const navigate = useNavigate();
	const { run: runRecovery, data: recoveryResponse, error } = useApiRequest({});

	const reset = (data: forgotPasswordData) => {
		runRecovery(forgotPasswordService(data));
	};

	useMemo(() => {
		if (recoveryResponse?.status === 200) {
			alert("Check your email for instructions!");
			navigate(Routes.resetPassword);
		} else if (error) {
			alert("Sorry, an error occured");
		}
	}, [error, navigate, recoveryResponse]);

	const login = () => {
		navigate(Routes.home);
	};
	return (
		<>
			<ForgotPasswordUI login={login} recovery={reset} clear />
		</>
	);
};

export { ForgotPassword };
