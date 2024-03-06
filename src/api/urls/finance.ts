/*
=================================
TRANSACTIONS URLS
=================================
*/

import { appendParams } from "helpers/appendParams";

/**
 * Fetch transactions URL
 * @returns url string
 *
 */

export const fetchTransactionsURL = (params) =>
  `/admin/list_transactions/?${appendParams(params)}`;

/**
 * Payout URL
 * @returns url string
 *
 */

export const payoutURL = (ref) => `/admin/payout/${ref}`;

/**
 * Fetch transaction stats URL
 * @returns url string
 *
 */

export const fetchStatURL = (params) => `/admin/stat/?${appendParams(params)}`;

/**
 * Fetch revenue graph data URL
 * @returns url string
 *
 */

export const fetchRevenueGraphURL = (params) =>
  `/admin/graph/?${appendParams(params)}`;
