/*
=================================
PROPERTIES SERVICES
=================================
*/

import {
  approveEditURL,
  approvePropertyURL,
  deleteRequest,
  discardApplicationURL,
  fetchApplicationURL,
  fetchApplicationsURL,
  fetchEditURL,
  fetchEditedPropertiesURL,
  fetchPropertiesURL,
  fetchPropertyURL,
  getRequest,
  postRequest,
  rejectEditURL,
  rejectPropertyURL,
  setMarketValueURL,
  setRentURL,
  suspendPropertyURL,
  unsuspendPropertyURL,
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

/**
 * Fetch single property service
 * @returns axios promise
 */

export const fetchPropertyService = (id: string) => {
  const requestData = {
    url: fetchPropertyURL(id),
  };
  return getRequest(requestData);
};

/**
 * Approve property service
 * @returns axios promise
 */

export const approvePropertyService = (id: string) => {
  const requestData = {
    url: approvePropertyURL(id),
  };
  return getRequest(requestData);
};

/**
 * Reject property service
 * @returns axios promise
 */

export const rejectPropertyService = (id: string, reason: string) => {
  const requestData = {
    url: rejectPropertyURL(id),
    data: { reason },
  };
  return postRequest(requestData);
};

/**
 * Discard listing/marketplace application service
 * @returns axios promise
 */

export const discardApplicationService = (id: string) => {
  const requestData = {
    url: discardApplicationURL(id),
  };
  return getRequest(requestData);
};

/**
 * Set market value of a property service
 * @returns axios promise
 */

export const setMarketValueService = (id: string, value: number) => {
  const requestData = {
    url: setMarketValueURL(id),
    data: { value },
  };
  return postRequest(requestData);
};

/**
 * Set rent per annum for a property service
 * @returns axios promise
 */

export const setRentService = (id: string, value: number) => {
  const requestData = {
    url: setRentURL(id),
    data: { value },
  };
  return postRequest(requestData);
};

/**
 * Approve property edit service
 * @returns axios promise
 */

export const approveEditService = (id: string) => {
  const requestData = {
    url: approveEditURL(id),
  };
  return getRequest(requestData);
};

/**
 * Reject property edit service
 * @returns axios promise
 */

export const rejectEditService = (id: string, reason: string) => {
  const requestData = {
    url: rejectEditURL(id),
    data: { reason },
  };
  return postRequest(requestData);
};

/**
 * Fetch property edit service
 * @returns axios promise
 */

export const fetchEditService = (id: string) => {
  const requestData = {
    url: fetchEditURL(id),
  };
  return getRequest(requestData);
};

/**
 * Suspend property service
 * @returns axios promise
 */

export const suspendPropertyService = ({
  id,
  reason,
}: {
  id: string;
  reason: string;
}) => {
  const requestData = {
    url: suspendPropertyURL(id),
    data: {
      reason,
    },
  };
  return postRequest(requestData);
};

/**
 * Unuspend property service
 * @returns axios promise
 */

export const unsuspendPropertyService = (id: string) => {
  const requestData = {
    url: unsuspendPropertyURL(id),
  };
  return getRequest(requestData);
};
