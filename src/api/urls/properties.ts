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

export const fetchEditedPropertiesURL = () => `/admin/list_property_change_applications/`;

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
