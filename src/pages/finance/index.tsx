import { fetchTransactionsService, payoutService } from "api";
import {
  ConfirmationModal,
  Preloader,
  Toast,
  TransactionTableItem,
} from "components";
import { FinanceUI } from "features";
import { getDateTime, getErrorMessage } from "helpers";
import { useApiRequest, useDebounce } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { optionType } from "types";

const Finance = () => {
  // States
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });
  const [status, setStatus] = useState<optionType | undefined>(undefined);
  const [type, setType] = useState<optionType | undefined>(undefined);
  const [date, setDate] = useState({ start: "", end: "" });
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [confirm, setConfirm] = useState({ show: false, ref: "" });

  const navigate = useNavigate();
  const handleViewProperty = (id) => navigate(Routes.property(id));

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});
  const {
    run: runPayout,
    data: payoutResponse,
    requestStatus: payoutStatus,
    error: payoutError,
  } = useApiRequest({});

  const fechTransactions = (
    page?,
    dates?,
    transactionStatus?,
    transactionType?
  ) =>
    runFetch(
      fetchTransactionsService({
        page: page ?? pages.currentPage,
        limit: pages.pageLimit,
        search,
        status: transactionStatus?.value ?? status?.value,
        transaction_type: transactionType?.value ?? type?.value,
        start_date: dates?.start ?? date.start,
        end_date: dates?.end ?? date.end,
      })
    );

  useEffect(() => {
    fechTransactions(1);

    setPages((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  }, [debouncedSearchTerm]);

  const transactions = useMemo<TransactionTableItem[]>(() => {
    if (fetchResponse?.status === 200) {
      setPages((prev) => ({
        ...prev,
        totalPages: fetchResponse.data.pages,
        totalCount: fetchResponse.data.total,
      }));

      return fetchResponse.data.results.map((item) => ({
        id: item.id,
        date: getDateTime(item.created_at).date,
        amount: `NGN ${item.amount}`,
        type: item.transaction_type.toLowerCase(),
        property: item.property_name,
        propertyId: item.property_id,
        user: item.user,
        status: item.status.toLowerCase(),
        transactionRef: item.reference,
      }));
    } else if (fetchError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchError,
          message: "Failed to fetch transactions, please try again later",
        }),
        type: false,
      });
    }
    return [];
  }, [fetchResponse, fetchError]);

  const handlePages = (page: number) => {
    fechTransactions(page);
    setPages((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleFilter = ({ status, date, type }) => {
    setStatus(status);
    setType(type);
    setDate(date);
    setPages((prev) => ({
      ...prev,
      currentPage: 1,
    }));
    fechTransactions(1, date, status, type);
  };

  const handlePayAgent = () => {
    runPayout(payoutService(confirm.ref));
  };

  useMemo(() => {
    if (payoutResponse?.status === 200) {
      setConfirm({ show: false, ref: "" });
      fechTransactions(1);
      setToast({
        show: true,
        text: payoutResponse?.data?.message ?? "Successfully initated payment!",
        type: false,
      });
    } else if (payoutError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: payoutError,
          message: "Failed to initiate payment",
        }),
        type: false,
      });
    }
  }, [payoutResponse, payoutError]);


  const loading = fetchStatus.isPending || payoutStatus.isPending;

  return (
    <>
      <Preloader loading={loading} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <ConfirmationModal
        show={confirm.show}
        close={() => setConfirm({ show: false, ref: "" })}
        text={`Are you sure you want initiate this payment?`}
        submit={handlePayAgent}
      />
      <FinanceUI
        transactions={transactions}
        pagination={{ ...pages, handleChange: handlePages }}
        search={{
          value: search,
          handleChange: setSearch,
        }}
        type={type}
        status={status}
        date={date}
        handleFilter={handleFilter}
        handleViewProperty={handleViewProperty}
        handlePayAgent={(ref) => setConfirm({ show: true, ref })}
      />
    </>
  );
};

export { Finance };
