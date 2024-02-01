/*
=================================
USER SERVICES
=================================
*/

import { userURL, getRequest} from "api";

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