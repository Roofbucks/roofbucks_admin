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
  search: string;
  page: number;
  limit?: number;
}

export const userService = (data: userData) => {
  const request = {
    url: userURL({currentPage: data.page}),
    data
  };
  return getRequest(request);
};