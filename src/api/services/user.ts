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

export const userService = () => {
  const request = {
    url: userURL(),
  };
  return getRequest(request);
};