/*
=================================
USER SERVICES
=================================
*/

import { userURL, getRequest, userProfileURL, userSuspendURL, postRequest, userVerifyURL, userUnsuspendURL, businessVerifyURL} from "api";

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

export const userProfileService = (id) => {
  const request = {
    url: userProfileURL(id)
  };
  return getRequest(request);
}

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


export const userVerifyService = (id) => {
  const request = {
    url: userVerifyURL(id),
  };
  return getRequest(request);
};

export const businessVerifyService = (id) => {
  const request = {
    url: businessVerifyURL(id),
  };
  return getRequest(request);
};