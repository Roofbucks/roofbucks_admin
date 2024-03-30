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
	updateNameURL,
} from "api";

/**
 * settings service
 * @returns axios promise
 */



export const userNameService = () => {
	const request = {
		url: userNameURL(),
	};
	return getRequest(request);
};

export interface UserName {
	firstname: string;
	lastname: string;
}
export const UpdateNameService = (data:UserName) => {
	const request = {
		url: updateNameURL(),
		data
	}
	return postRequest(request)
}
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
