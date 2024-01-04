/*
=================================
USERS SERVICES
=================================
*/

import {
  approveCompanyURL,
  fetchUserPropertiesURL,
  fetchUserURL,
  fetchUsersURL,
  getRequest,
  postRequest,
  resendMailURL,
} from "api";

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

/**
 * Fetch user service
 * @returns axios promise
 */

export const fetchUserService = (id: string) => {
  const requestData = {
    url: fetchUserURL(id),
  };
  return getRequest(requestData);
};

interface fetchUserPropertiesParams {
  page: number;
  limit: number;
}

/**
 * Fetch user service
 * @returns axios promise
 */

export const fetchUserPropertiesService = (
  id: string,
  params: fetchUserPropertiesParams
) => {
  const requestData = {
    url: fetchUserPropertiesURL(id),
    config: {
      params,
    },
  };
  return getRequest(requestData);
};

/**
 * Approve company service
 * @returns axios promise
 */

export const approveCompanyService = (id: string) => {
  const requestData = {
    url: approveCompanyURL(id),
  };
  return getRequest(requestData);
};
