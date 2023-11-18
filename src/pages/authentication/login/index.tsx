import { loginService, LoginRequestData } from "api";
import { LoginUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Routes } from "router";

const Login = () => {
	const navigate = useNavigate();
	const { run: runLogin, data: response, error } = useApiRequest({});
	useMemo(() => {
		if (response?.status === 200) {
			navigate(Routes.overview);
		} else if (error) {
			alert("Sorry, there is an error somewhere")
		}
	}, [response, navigate, error]);

	const login = (data: LoginRequestData) => {
		runLogin(loginService(data));
	};
	const forgot = () => {};
	return (
		<>
			<LoginUI login={login} forgotPassword={forgot} />
		</>
	);
};

export { Login };
