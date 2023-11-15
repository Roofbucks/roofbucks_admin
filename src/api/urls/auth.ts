/*
=================================
AUTH URLS
=================================
*/

/**
 * Login URL
 *
 * @returns url string
 *
 */

export const loginURL = () => `/auth/login/`;

/**
 * Request Password Reset URL
 *
 * @returns url string
 *
 */

export const resetPasswordURL = () => `/auth/request-reset-password-email/`;

/**
 * Password Reset URL
 *
 * @returns url string
 *
 */

export const newPasswordURL = () => `/auth/set-new-password/`;

/**
 * Refresh JWT URL
 *
 * @returns url string
 *
 */

export const refreshTokenURL = () => `/auth/refresh-token/`;
