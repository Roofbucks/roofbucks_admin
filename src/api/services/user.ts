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
  filter: {
    status: {
      label?: any;
      value?: any
    }
    accountType: {
      label?: any;
      value?: any
    }
  }
  page: number;
  limit?: number;
}

export const userService = (data: userData) => {
  const request = {
    url: userURL({currentPage: data.page, searchTerm: data.search, filter: data.filter}),
    data
  };
  return getRequest(request);
};