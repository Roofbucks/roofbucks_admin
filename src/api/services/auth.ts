/*
=================================
AUTH SERVICES
=================================
*/
import { postRequest } from "api";
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

export interface resetPasswordRequestData {
  token: string;
  data: {password: string, confirmPassword: string};
}

export const resetPasswordService = (data: resetPasswordRequestData) => {
  const requestData = {
    url: resetPasswordURL({ uid64: data.token, token: data.token}),
    data: data.data
  };
  return postRequest(requestData);
};