/*
=================================
AUTH SERVICES
=================================
*/

import { loginURL, postRequest, forgotPasswordURL, resetPasswordURL } from "api";

/**
 * login service
 * @returns axios promise
 */

export interface loginData {
  email: string;
  password: string;
}

export const loginService = (data: loginData) => {
  const request = {
    url: loginURL(),
    data
  };
  return postRequest(request);
};

export interface forgotPasswordData {
  email: string;
}

export const forgotPasswordService = (data: forgotPasswordData) => {
  const request = {
    url: forgotPasswordURL(),
    data
  };
  return postRequest(request);
};

export interface resetPasswordData {
  token: string;
  data: {password: string, confirmPassword: string};
}

export const resetPasswordService = (data: resetPasswordData) => {
  const request = {
    url: resetPasswordURL({ uid64: data.token, token: data.token}),
    data: data.data
  };
  return postRequest(request);
};