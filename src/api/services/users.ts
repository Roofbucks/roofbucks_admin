/*
=================================
USERS SERVICES
=================================
*/

import { fetchUsersURL, getRequest, postRequest, resendMailURL } from "api";

interface fetchUsersParams {
  search: string;
  page: number;
  limit: number;
  role: "AGENT" | "SHAREHOLDER" | undefined;
  status: "verified" | "unverified" | "suspended" | undefined;
}
/**
 * Fetch users service
 * @returns axios promise
 */

export const fetchUsersService = (params: fetchUsersParams) => {
  const requestData = {
    url: fetchUsersURL(),
    config: {
      params,
    },
  };
  return getRequest(requestData);
};

interface resendMailRequestData {
  email: string;
}
/**
 * Resend verification service
 * @returns axios promise
 */

export const resendMailService = (data: resendMailRequestData) => {
  const requestData = {
    url: resendMailURL(),
    data,
  };
  return postRequest(requestData);
};
