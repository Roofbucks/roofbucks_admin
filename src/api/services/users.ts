
import { getRequest, usersURL } from "api";

/*
=================================
USERS SERVICES
=================================
*/

export const usersService = () => {
	const request = {
		url: usersURL(),
	};
	return getRequest(request);
};
