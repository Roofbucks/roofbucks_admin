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
 * ForgotPassword URL
 * 
 * @returns url string
 */
export const forgotPasswordURL = () => `/auth/request-reset-password-email/`;

/**
 * ResetPassword URL
 * 
 * @returns url string
 */
export const resetPasswordURL = () => `/auth/set-new-password/`;