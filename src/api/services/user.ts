/*
=================================
USER SERVICES
=================================
*/

import { userURL, getRequest, userProfileURL, userSuspendURL, postRequest, userVerifyURL, userUnsuspendURL, businessVerifyURL, userPropertyURL} from "api";

/**
 * user service
 * @returns axios promise
 */

export interface userData {
  searchTerm: string;
  status: string;
  role: string;
  currentPage: number;
  limit: number;
}

export const userService = (data: userData) => {
  const request = {
    url: userURL(data)
  };
  return getRequest(request);
};

/**
 * user profile service
 * @returns axios promise
 */

export const userProfileService = (id) => {
  const request = {
    url: userProfileURL(id)
  };
  return getRequest(request);
}

/**
 * user property service
 * @returns axios promise
 */

export const userPropertyService = (id) => {
  const request = {
    url: userPropertyURL(id)
  };
  return getRequest(request);
}

/**
 * user suspend service
 * @returns axios promise
 */

export interface suspendData {
  email: string;
}

export const userSuspendService = (data: suspendData) => {
  const request = {
    url: userSuspendURL(),
    data
  };
  return postRequest(request);
};

/**
 * user unsuspend service
 * @returns axios promise
 */

export interface unsuspendData {
  email: string;
}

export const userUnsuspendService = (data: unsuspendData) => {
  const request = {
    url: userUnsuspendURL(),
    data
  };
  return postRequest(request);
};

/**
 * user verify service
 * @returns axios promise
 */

export const userVerifyService = (id) => {
  const request = {
    url: userVerifyURL(id),
  };
  return getRequest(request);
};

/**
 * user business verify service
 * @returns axios promise
 */

export const businessVerifyService = (id) => {
  const request = {
    url: businessVerifyURL(id),
  };
  return getRequest(request);
};