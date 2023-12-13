/*
=================================
AUTH SERVICES
=================================
*/

import {
  axiosInstanceUnauth,
  loginURL,
  newPasswordURL,
  refreshTokenURL,
  resetPasswordURL,
} from "api";

interface loginData {
  email: string;
  password: string;
}
/**
 * login service
 * @returns axios promise
 */

export const loginService = (data: loginData) => {
  return axiosInstanceUnauth.post(loginURL(), data);
};

interface resetPasswordData {
  email: string;
  redirect_url: string;
}
/**
 * request password reset service
 * @returns axios promise
 */

export const resetPasswordService = (data: resetPasswordData) => {
  return axiosInstanceUnauth.post(resetPasswordURL(), data);
};

interface newPasswordData {
  password: string;
  uid64: string;
  token: string;
}
/**
 * reset password service
 * @returns axios promise
 */

export const newPasswordService = (data: newPasswordData) => {
  return axiosInstanceUnauth.patch(newPasswordURL(), data);
};

interface refreshTokenData {
  refresh: string;
}
/**
 * refresh JWT service
 * @returns axios promise
 */

export const refreshTokenService = (data: refreshTokenData) => {
  return axiosInstanceUnauth.post(refreshTokenURL(), data);
};
