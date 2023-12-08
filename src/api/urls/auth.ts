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
 * Fogrot URL
 *
 * @returns url string
 *
 */

export const forgotPasswordURL = () => `/auth/request-reset-password-email/`;

/**
 * Reset URL
 *
 * @returns url string
 *
 */
  
export const resetPasswordURL = () => `/auth/set-new-password/`;