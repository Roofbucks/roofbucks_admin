/*
=================================
ACCOUNT SERVICES
=================================
*/

import {
  changePasswordURL,
  editNameURL,
  fetchProfileURL,
  getRequest,
  postRequest,
} from "api";

export interface changePasswordRequestData {
  current_password: string;
  new_password: string;
}
/**
 * Change password service
 * @returns axios promise
 */

export const changePasswordService = (data: changePasswordRequestData) => {
  const requestData = {
    url: changePasswordURL(),
    data,
  };
  return postRequest(requestData);
};

export interface editNameRequestData {
  firstname: string;
  lastname: string;
}
/**
 * Edit name service
 * @returns axios promise
 */

export const editNameService = (data: changePasswordRequestData) => {
  const requestData = {
    url: editNameURL(),
    data,
  };
  return postRequest(requestData);
};

/**
 * Fetch profile service
 * @returns axios promise
 */

export const fetchProfileService = () => {
  const requestData = {
    url: fetchProfileURL(),
  };

  return getRequest(requestData);
};
