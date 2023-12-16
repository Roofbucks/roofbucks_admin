/*
=================================
USERS URLS
=================================
*/

/**
 * Fetch users url
 *
 * @returns url string
 *
 */

export const fetchUsersURL = () => `/admin/get_users/`;

/**
 * Resend verification mail url
 *
 * @returns url string
 *
 */

export const resendMailURL = () => `/admin/resend_mail/`;

/**
 * Fetch user url
 *
 * @returns url string
 *
 */

export const fetchUserURL = (id) => `/admin/get_user/${id}/`;

/**
 * Fetch user properties url
 *
 * @returns url string
 *
 */

export const fetchUserPropertiesURL = (id) => `/admin/get_user_properties/${id}/`;
