/*
=================================
TEAM SERVICES
=================================
*/

import {
  deleteMemberURL,
  deleteRequest,
  fetchMembersURL,
  getRequest,
  inviteMemberURL,
  postRequest,
} from "api";

export interface inviteMemberRequestData {
  email: string;
  role: string;
}
/**
 * invite team member service
 * @returns axios promise
 */

export const inviteMemberService = (data: inviteMemberRequestData[]) => {
  const requestData = {
    url: inviteMemberURL(),
    data,
  };
  return postRequest(requestData);
};

interface FetchMembersParams {
  search: string;
  page: number;
  limit: number;
  role: "Administrator" | "Member" | undefined;
}
/**
 * Fetch team members service
 * @returns axios promise
 */

export const fetchMembersService = (params: FetchMembersParams) => {
  const requestData = {
    url: fetchMembersURL(),
    config: {
      params,
    },
  };
  return getRequest(requestData);
};

/**
 * Delete team member service
 * @returns axios promise
 */

export const deleteMemberService = (id: string) => {
  const requestData = {
    url: deleteMemberURL(id),
  };
  return deleteRequest(requestData);
};
