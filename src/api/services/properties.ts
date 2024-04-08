/*
=================================
USER SERVICES
=================================
*/

import { getRequest } from "api/requestProcessor";
import { propertiesURL } from "api/urls";

/**
 * properties service
 * @returns axios promise
 */

export interface propertiesData {
  searchTerm: string;
  status: string;
  stage: string;
  currentPage: number;
  limit: number;
  startDate: string;
  endDate: string;
}

export const propertiesService = (data: propertiesData) => {
  const request = {
    url: propertiesURL(data)
  };
  return getRequest(request);
}