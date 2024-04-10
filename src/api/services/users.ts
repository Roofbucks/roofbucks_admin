/*
=================================
USER SERVICES
=================================
*/
import {
	usersURL,
	getRequest,
	userProfileURL,
	suspendUserURL,
	postRequest,
	verifyProfileURL,
	unsuspendUserURL,
	approveCompanyURL,
	userPropertyURL,
} from "api";
/**
 * user service
 * @returns axios promise
 */

export interface userData {
	search: string;
	status: string;
	role: string;
	currentPage: number;
	limit: number;
}

export const userService = (data: userData) => {
	const request = {
		url: usersURL(data),
	};
	return getRequest(request);
};

/**
 * user profile service
 * @returns axios promise
 */

export const userProfileService = (id) => {
	const request = {
		url: userProfileURL(id),
	};
	return getRequest(request);
};

/**
 * user property service
 * @returns axios promise
 */

export const userPropertyService = (id) => {
	const request = {
		url: userPropertyURL(id),
	};
	return getRequest(request);
};

/**
 * user suspend service
 * @returns axios promise
 */

export interface suspendData {
	email: string;
}

export const suspendUserService = (data: suspendData) => {
	const request = {
		url: suspendUserURL(),
		data,
	};
	return postRequest(request);
};

/**
 * user unsuspend service
 * @returns axios promise
 */

export interface unsuspendData {
	email: string;
}

export const unsuspendUserService = (data: unsuspendData) => {
	const request = {
		url: unsuspendUserURL(),
		data,
	};
	return postRequest(request);
};

/**
 * user verify service
 * @returns axios promise
 */

export const verifyProfileService = (id) => {
	const request = {
		url: verifyProfileURL(id),
	};
	return getRequest(request);
};

/**
 * user business verify service
 * @returns axios promise
 */

export const approveCompanyService = (id) => {
	const request = {
		url: approveCompanyURL(id),
	};
	return getRequest(request);
};
