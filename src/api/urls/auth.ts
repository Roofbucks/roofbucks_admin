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

export const forgotPasswordURL = () => `/auth/request-reset-password-email/`;

export const getTokenURL = ({uid64, token}) => `auth/password-reset/${uid64}/${token}/`;

export const resetPasswordURL = () => `/auth/set-new-password/`;