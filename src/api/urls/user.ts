/*
=================================
USER URLS
=================================
*/

/**
 * USER URL
 *
 * @returns url string
 *
 */

export const userURL = ({ currentPage, searchTerm, role, status }) => {
  const queryParams = {
    page: currentPage,
    search: searchTerm || '',
    role: role ? role.toUpperCase() : undefined,
    status: status ? status.toLowerCase() : undefined
  };

  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `/admin/get_users/?${queryString}`;
};
