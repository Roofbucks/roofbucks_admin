/*
=================================
TRANSACTIONS SERVICES
=================================
*/

import { fetchTransactionsURL, getRequest } from "api";

export interface fetchTransactionsParams {
  search: string;
  page: number;
  limit: number;
  transaction_type:
    | "DEPOSIT"
    | "INVESTMENT"
    | "RENT"
    | "BUY-BACK"
    | "DEPOSIT-PAYOUT"
    | "RENT-PAYOUT"
    | "BUY-BACK-PAYOUT";
  status: "PENDING" | "SUCCESS" | "FAILED";
  start_date: string;
  end_date: string;
}
/**
 * Fetch transactions service
 * @returns axios promise
 */

export const fetchTransactionsService = (params: fetchTransactionsParams) => {
  const requestData = {
    url: fetchTransactionsURL(params),
  };
  return getRequest(requestData);
};
