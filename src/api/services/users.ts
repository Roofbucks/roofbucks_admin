/*
=================================
USERS SERVICES
=================================
*/

import { fetchUsersURL, getRequest } from "api";

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
