/*
=================================
USER URLS
=================================
*/

/**
 * USER URL
 *
 * @returns url string
 *
 */

export const usersURL = ({ currentPage, search, role, status }) => {
	const queryParams = {
		page: currentPage,
		search: search || "",
		role: role.toUpperCase() || undefined,
		status: status.toLowerCase() || undefined,
	};

	const queryString = Object.entries(queryParams)
		.filter(([_, value]) => value !== undefined && value !== "")
		.map(([key, value]) => `${key}=${value}`)
		.join("&");

	return `/admin/get_users/?${queryString}`;
};

