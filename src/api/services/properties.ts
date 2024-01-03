/*
=================================
PROPERTIES SERVICES
=================================
*/

import {
  fetchApplicationURL,
  fetchApplicationsURL,
  fetchEditedPropertiesURL,
  fetchPropertiesURL,
  getRequest,
  postRequest,
} from "api";

interface fetchPropertiesParams {
  search: string;
  page: number;
  limit: number;
  stage: "WAITING" | "LISTING" | "MARKETPLACE" | "SOLD" | "";
  status: "verified" | "unverified" | "suspended" | "rejected" | "";
  start_date: string;
  end_date: string;
}
/**
 * Fetch properties service
 * @returns axios promise
 */

export const fetchPropertiesService = (params: fetchPropertiesParams) => {
  const requestData = {
    url: fetchPropertiesURL(),
    config: {
      params,
    },
  };
  return getRequest(requestData);
};

interface fetchApplicationsParams {
  search: string;
  page: number;
  limit: number;
  user_type: "HOME_OWNER" | "INVESTOR";
  status: "pending" | "rejected" | "approved" | "";
  start_date: string;
  end_date: string;
}
/**
 * Fetch applications service
 * @returns axios promise
 */

export const fetchApplicationsService = (params: fetchApplicationsParams) => {
  const requestData = {
    url: fetchApplicationsURL(),
    config: {
      params,
    },
  };
  return getRequest(requestData);
};

interface fetchEditedPropertiesParams {
  page: number;
  limit: number;
}
/**
 * Fetch applications service
 * @returns axios promise
 */

export const fetchEditedPropertiesService = (
  params: fetchEditedPropertiesParams
) => {
  const requestData = {
    url: fetchEditedPropertiesURL(),
    config: {
      params,
    },
  };
  return getRequest(requestData);
};

/**
 * Fetch one listing/marketplace application service
 * @returns axios promise
 */

export const fetchApplicationService = (id: string) => {
  const requestData = {
    url: fetchApplicationURL(id),
  };
  return getRequest(requestData);
};
