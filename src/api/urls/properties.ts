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

/**
 * Set market value of a property URL
 *
 * @returns url string
 *
 */

export const setMarketValueURL = (id) => `/admin/set_market_value/${id}/`;

/**
 * Set rent per annum for a property URL
 *
 * @returns url string
 *
 */

export const setRentURL = (id) => `/admin/set_rent_amount/${id}/`;

/**
 * Reject property edit URL
 *
 * @returns url string
 *
 */

export const rejectEditURL = (id) => `/admin/reject_property_change/${id}/`;

/**
 * Approve property edit URL
 *
 * @returns url string
 *
 */

export const approveEditURL = (id) => `/admin/approve_property_change/${id}/`;

/**
 * Fetch property edit URL
 *
 * @returns url string
 *
 */

export const fetchEditURL = (id) =>
  `/admin/single_property_change_application/${id}`;

/**
 * Suspend property URL
 *
 * @returns url string
 *
 */

export const suspendPropertyURL = (id) => `/admin/suspend_property/${id}/`;

/**
 * unsuspend property URL
 *
 * @returns url string
 *
 */

export const unsuspendPropertyURL = (id) => `/admin/unsuspend_property/${id}/`;
