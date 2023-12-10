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

/**
 * forgotpaasword service
 * @returns axios promise
 */
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

/**
 * resetpassword service
 * @returns axios promise
 */
export interface resetPasswordData {
  password: string;
  token: string
  uid64: string
}

export const resetPasswordService = (data: resetPasswordData) => {
  const request = {
    url: resetPasswordURL(),
    data
  };
  return patchRequest(request);
};

