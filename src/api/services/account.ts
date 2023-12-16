/*
=================================
ACCOUNT SERVICES
=================================
*/

import { changePasswordURL, postRequest } from "api";

export interface changePasswordRequestData {
  current_password: string;
  new_password: string;
}
/**
 * Fetch users service
 * @returns axios promise
 */

export const changePasswordService = (data: changePasswordRequestData) => {
  const requestData = {
    url: changePasswordURL(),
    data,
  };
  return postRequest(requestData);
};
