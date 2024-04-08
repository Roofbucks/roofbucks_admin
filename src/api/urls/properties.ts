/*
=================================
PROPERTIES URLS
=================================
*/

/**
 * PROPERTIES URL
 *
 * @returns url string
 *
 */

export const propertiesURL = ({ currentPage, searchTerm, endDate, startDate, status, stage }) => {
  const queryParams = {
    page: currentPage,
    search: searchTerm || '',
    start_date: startDate || '',
    end_date: endDate || '',
    status: status ? status.toLowerCase() : undefined,
    stage: stage ? stage.toLowerCase() : undefined
  };

  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `/admin/list_properties/?${queryString}`;
};