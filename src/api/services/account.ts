/*
=================================
ACCOUNT SERVICES
=================================
*/

import {
  changePasswordURL,
  editNameURL,
  fetchNotifsURL,
  fetchProfileURL,
  getRequest,
  markAsReadURL,
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

/**
 * Fetch notifications service
 * @returns axios promise
 */

export const fetchNotifsService = (page, status?) => {
  const requestData = {
    url: fetchNotifsURL(),
    config: {
      params: {
        page,
        status,
        limit: 20,
      },
    },
  };

  return getRequest(requestData);
};

/**
 * Mark activity as read service
 * @returns axios promise
 */

export const markAsReadService = (id: string) => {
  const requestData = {
    url: markAsReadURL(id),
  };

  return getRequest(requestData);
};
