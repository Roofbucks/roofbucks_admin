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

export const fetchUserPropertiesURL = (id) =>
  `/admin/get_user_properties/${id}/`;

/**
 * Approve company url
 *
 * @returns url string
 *
 */

export const approveCompanyURL = (id) => `/admin/approve_company/${id}/`;

/**
 * Suspend user url
 *
 * @returns url string
 *
 */

export const suspendUserURL = () => `/admin/suspend_user/`;

/**
 * Unsuspend user url
 *
 * @returns url string
 *
 */

export const unsuspendUserURL = () => `/admin/unsuspend_user/`;


/**
 * Verify user profile url
 *
 * @returns url string
 *
 */

export const verifyProfileURL = (id) => `/admin/verify_profile/${id}/`;