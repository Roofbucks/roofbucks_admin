/*
=================================
SETTINGS SERVICES
=================================
*/

import { postRequest, settingsSecurityURL, settingsAccountURL, fetchUserProfileURL, getRequest } from "api"

/**
 * Settings account service
 * @param data
 * @returns axios promise
 */

export interface settingsAccountData {
  firstname: string;
  lastname: string;
}

export const settingsAccountService = (data: settingsAccountData) => {
  const request = {
    url: settingsAccountURL(),
    data
  };
  return postRequest(request);
};

/**
 * Settings security service
 * @param data
 * @returns axios promise
 */

export interface settingsSecurityData {
  currentPassword: string;
  newPassword: string;
}

export const settingsSecurityService = (data: settingsSecurityData) => {
  const request = {
    url: settingsSecurityURL(),
    data
  };
  return postRequest(request);
};

/**
 * Settings get user name service
 * @param data
 * @returns axios promise
 */

export const fetchUserProfileService = () => {
  const request = {
    url: fetchUserProfileURL(),
  };
  return getRequest(request);
};