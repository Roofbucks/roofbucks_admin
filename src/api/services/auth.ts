import { postRequest } from "api";
import { loginURL} from "api";

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
		data
	};
	return postRequest(requestData);
};