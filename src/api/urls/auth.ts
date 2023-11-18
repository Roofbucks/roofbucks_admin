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

export const forgotPasswordURL = () => `/auth/change-password/`;

export const resetPasswordURL = ({ uid64, token }) => `/auth/password-reset/${uid64}/${token}/`;