/*
=================================
AUTH SERVICES
=================================
*/

import { loginURL, postRequest, forgotPasswordURL, resetPasswordURL, patchRequest } from "api";

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
  password: string;
  token: string | null;
  uid64: string | null;
}

export const resetPasswordService = (data: resetPasswordData) => {
  const request = {
    url: resetPasswordURL(),
    data
  };
  return patchRequest(request);
};
