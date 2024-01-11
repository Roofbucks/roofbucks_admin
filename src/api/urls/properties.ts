/*
=================================
PROPERTIES URLS
=================================
*/

/**
 * Fetch properties URL
 *
 * @returns url string
 *
 */

export const fetchPropertiesURL = () => `/admin/list_properties/`;

/**
 * Fetch edited properties URL
 *
 * @returns url string
 *
 */

export const fetchEditedPropertiesURL = () =>
  `/admin/list_property_change_applications/`;

/**
 * Fetch applications URL
 *
 * @returns url string
 *
 */

export const fetchApplicationsURL = () => `/admin/list_applications/`;

/**
 * Fetch one listing/marketplace application URL
 *
 * @returns url string
 *
 */

export const fetchApplicationURL = (id) => `/admin/get_application/${id}`;

/**
 * Fetch single property URL
 *
 * @returns url string
 *
 */

export const fetchPropertyURL = (id) => `/admin/get_property/${id}`;

/**
 * Approve property URL
 *
 * @returns url string
 *
 */

export const approvePropertyURL = (id) => `/admin/approve_property/${id}/`;

/**
 * Reject property URL
 *
 * @returns url string
 *
 */

export const rejectPropertyURL = (id) => `/admin/reject_property/${id}/`;

/**
 * Discard listing/marketplace application URL
 *
 * @returns url string
 *
 */

export const discardApplicationURL = (id) => `/admin/delete_application/${id}/`;
