import {
	forgotPasswordURL,
	patchRequest,
	postRequest,
	resetPasswordURL,
	loginURL,
	axiosInstanceUnauth,
} from "api";

/*
=================================
AUTH SERVICES
=================================
*/
export interface LoginRequestData {
	email: string;
	password: string;
}
/**
 * login service
 * @returns axios promise
 */
export const loginService = (data: LoginRequestData) => {
	const requestData = {
		url: loginURL(),
		data,
	};
	return axiosInstanceUnauth.post(requestData.url, requestData.data);
};

export interface forgotPasswordData {
	email: string;
	redirect_url: string;
}

export const forgotPasswordService = (data: forgotPasswordData) => {
	const request = {
		url: forgotPasswordURL(),
		data,
	};
	return postRequest(request);
};
export interface resetPasswordData {
	password: string;
	token: string;
	uid64: string;
}

export const resetPasswordService = (data: resetPasswordData) => {
	const request = {
		url: resetPasswordURL(),
		data,
	};
	return patchRequest(request);
};
