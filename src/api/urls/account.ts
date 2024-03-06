/*
=================================
ACCOUNT URLS
=================================
*/

/**
 * Change password url
 *
 * @returns url string
 *
 */

export const changePasswordURL = () => `/auth/change-password/`;

/**
 * Edit name url
 *
 * @returns url string
 *
 */

export const editNameURL = () => `/admin/update_name/`;

/**
 * Fetch profile url
 *
 * @returns url string
 *
 */

export const fetchProfileURL = () => `/user/profile/`;

/**
 * Fetch notifications url
 *
 * @returns url string
 *
 */

export const fetchNotifsURL = (page) => `/admin/activities/?page=${page}&limit=${20}`;

/**
 * Mark activity as read url
 *
 * @returns url string
 *
 */
export const markAsReadURL = (id) => `/admin/mark_as_read/${id}/`;
