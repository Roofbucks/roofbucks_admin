/*
=================================
SETTINGS SERVICES
=================================
*/

import {
	userNameURL,
	getRequest,
	patchRequest,
	updatePasswordURL,
	postRequest,
} from "api";

/**
 * settings service
 * @returns axios promise
 */

export interface UserName {
	firstname: string;
	lastname: string;
}

export const userNameService = () => {
	return getRequest({ url: userNameURL() });
};
export const patchUserNameService = (data: UserName) => {
	const request = {
		url: userNameURL(),
		data,
	};
	return patchRequest(request);
};
export interface UpdatePassword {
	current_password: string;
	new_password: string;
}
export const updatePasswordService = (data: UpdatePassword) => {
	const request = {
		url: updatePasswordURL(),
		data,
	};
	return postRequest(request);
};
