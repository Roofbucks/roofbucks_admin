/*
=================================
USER SERVICES
=================================
*/

import { usersURL, getRequest } from "api";

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
