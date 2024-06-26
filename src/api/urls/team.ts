/*
=================================
TEAM URLS
=================================
*/

/**
 * Invite team member url
 *
 * @returns url string
 *
 */

export const inviteMemberURL = () => `/admin/invite/`;

/**
 * Fetch team members url
 *
 * @returns url string
 *
 */

export const fetchMembersURL = () => `/admin/team/`;

/**
 * Delete team member url
 *
 * @returns url string
 *
 */

export const deleteMemberURL = (id) => `/admin/remove/${id}/`;
