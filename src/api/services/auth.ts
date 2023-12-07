/*
=================================
AUTH SERVICES
=================================
*/
import { postRequest, patchRequest } from "api";
import { loginURL, forgotPasswordURL, resetPasswordURL } from "api";

/**
 * login service
 * @returns axios promise
 */

export interface loginRequestData {
  email: string;
  password: string;
}

export const loginService = (data: loginRequestData) => {
  const requestData = {
    url: loginURL(),
    data
  };
  return postRequest(requestData);
};

export interface forgotPasswordRequestData {
  email: string;
}

export const forgotPasswordService = (data: forgotPasswordRequestData) => {
  const requestData = {
    url: forgotPasswordURL(),
    data
  };
  return postRequest(requestData);
};

export interface resetPasswordData {
  password: string;
  token: string | null;
  uid64: string | null
}

export const resetPasswordService = (data: resetPasswordData) => {
  const request = {
    url: resetPasswordURL(),
    data
  };
  return patchRequest(request);
};