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
