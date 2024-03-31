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

export const userURL = ({ currentPage, searchTerm, role, status }) => {
  const queryParams = {
    page: currentPage,
    search: searchTerm || '',
    role: role ? role.toUpperCase() : undefined,
    status: status ? status.toLowerCase() : undefined
  };

  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `/admin/get_users/?${queryString}`;
};

/**
 * GET USER URL
 *
 * @returns url string
 *
 */

export const userProfileURL = (id) => `/admin/get_user/${id}/`

/**
 * SUSPEND USER URL
 *
 * @returns url string
 *
 */

export const userSuspendURL = () => `/admin/suspend_user/`

/**
 * UNSUSPEND USER URL
 *
 * @returns url string
 *
 */

export const userUnsuspendURL = () => `/admin/unsuspend_user/`

/**
 * VERIFY USER URL
 *
 * @returns url string
 *
 */

export const userVerifyURL = (id) => `/admin/verify_profile/${id}/`

/**
 * VERIFY USER URL
 *
 * @returns url string
 *
 */

export const businessVerifyURL = (id) => `/admin/approve_company/${id}/`