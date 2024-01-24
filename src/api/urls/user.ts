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

export const userURL = ({ currentPage, searchTerm, filter }) => {
  let url = `/admin/get_users/?page=${currentPage}`;

  if (searchTerm) {
    url += `&search=${searchTerm}`;
  } else if (filter.accountType.value) {
    url += `&role=${filter.accountType.value.toUpperCase()}`;
  } else if (filter.status.value) {
    url += `&status=${filter.status.value.toUpperCase()}`;
  } else if (filter.accountType.value && filter.status.value) {
    url += `&status=${filter.status.value.toUpperCase()}&role=${filter.accountType.value.toUpperCase()}`
  }

  return url
}