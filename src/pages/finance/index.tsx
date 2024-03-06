import {
  fetchRevenueGraphService,
  fetchStatService,
  fetchTransactionsService,
  payoutService,
} from "api";
import {
  ConfirmationModal,
  Preloader,
  Toast,
  TransactionTableItem,
} from "components";
import { FinanceUI, RevenueData, StatInfo } from "features";
import { formatDate, getDateTime, getErrorMessage } from "helpers";
import { useApiRequest, useDebounce } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { optionType } from "types";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Create a new Date object for today's date
let pastThirtyDays = new Date();
// Subtract 30 days from the current date
pastThirtyDays.setDate(pastThirtyDays.getDate() - 30);

// Create a new Date object for today's date
let pastYear = new Date();
// Subtract 30 days from the current date
pastYear.setDate(pastYear.getDate() - 365);

const Finance = () => {
  // States
  const [statDates, setStatDates] = useState({
    start: formatDate(pastThirtyDays),
    end: formatDate(new Date()),
  });
  const [graphDates, setGraphDates] = useState({
    start: formatDate(pastYear),
    end: formatDate(new Date()),
  });
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
  const {
    run: runStats,
    data: statsResponse,
    requestStatus: statsStatus,
    error: statsError,
  } = useApiRequest({});
  const {
    run: runRevenue,
    data: revenueResponse,
    requestStatus: revenueStatus,
    error: revenueError,
  } = useApiRequest({});

  const fetchTransactions = (
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

  const fetchStatData = (start?, end?) => {
    runStats(
      fetchStatService({
        start_date: start ?? statDates.start,
        end_date: end ?? statDates.end,
      })
    );
  };

  const fetchRevenueData = (start?, end?) => {
    runRevenue(
      fetchRevenueGraphService({
        start_date: start ?? graphDates.start,
        end_date: end ?? graphDates.end,
      })
    );
  };

  useEffect(() => {
    fetchStatData();
    fetchRevenueData();
  }, []);

  useEffect(() => {
    fetchTransactions(1);

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
    fetchTransactions(page);
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
    fetchTransactions(1, date, status, type);
  };

  const handlePayAgent = () => {
    runPayout(payoutService(confirm.ref));
  };

  useMemo(() => {
    if (payoutResponse?.status === 200) {
      setConfirm({ show: false, ref: "" });
      fetchTransactions(1);
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

  const stats = useMemo<StatInfo[]>(() => {
    if (statsResponse?.status === 200) {
      console.log(statsResponse);
      const data = statsResponse.data;

      return [
        {
          title: "Total Transactions",
          total: data.total_transaction,
          percentage: data.total_transaction_percentage_change,
          increase: data.total_transaction_percentage_change > 0,
          difference: data.total_transaction_difference,
        },
        {
          title: "Total Deposits",
          total: `NGN ${data.deposit_amount.toLocaleString()}`,
          percentage: Math.abs(Math.floor(data.deposit_percentage_change)),
          increase: data.deposit_percentage_change > 0,
          difference: `NGN ${Math.abs(
            data.deposit_amount_difference
          ).toLocaleString()}`,
        },
        {
          title: "Total Investments",
          total: `NGN ${data.investment_amount.toLocaleString()}`,
          percentage: Math.abs(Math.floor(data.investment_percentage_change)),
          increase: data.investment_percentage_change > 0,
          difference: `NGN ${Math.abs(
            data.investment_amount_difference
          ).toLocaleString()}`,
        },
        {
          title: "Total Rent",
          total: `NGN ${data.rent_amount.toLocaleString()}`,
          percentage: Math.abs(Math.floor(data.rent_percentage_change)),
          increase: data.rent_percentage_change > 0,
          difference: `NGN ${Math.abs(
            data.rent_amount_difference
          ).toLocaleString()}`,
        },
        {
          title: "Total Buy-back",
          total: `NGN ${data["buy-back_amount"].toLocaleString()}`,
          percentage: Math.abs(Math.floor(data["buy-back_percentage_change"])),
          increase: data["buy-back_percentage_change"] > 0,
          difference: `NGN ${Math.abs(
            data["buy-back_amount_difference"]
          ).toLocaleString()}`,
        },
        {
          title: "Total Rent Payout",
          total: `NGN ${data["rent-payout_amount"].toLocaleString()}`,
          percentage: Math.abs(
            Math.floor(data["rent-payout_percentage_change"])
          ),
          increase: data["rent-payout_percentage_change"] > 0,
          difference: `NGN ${Math.abs(
            data["rent-payout_amount_difference"]
          ).toLocaleString()}`,
        },
        {
          title: "Total Deposit Payout",
          total: `NGN ${data["deposit-payout_amount"].toLocaleString()}`,
          percentage: Math.abs(
            Math.floor(data["deposit-payout_percentage_change"])
          ),
          increase: data["deposit-payout_percentage_change"] > 0,
          difference: `NGN ${Math.abs(
            data["deposit-payout_amount_difference"]
          ).toLocaleString()}`,
        },
        {
          title: "Total Buy-back Payout",
          total: `NGN ${data["buy-back-payout_amount"].toLocaleString()}`,
          percentage: Math.abs(
            Math.floor(data["buy-back-payout_percentage_change"])
          ),
          increase: data["buy-back-payout_percentage_change"] > 0,
          difference: `NGN ${Math.abs(
            data["buy-back-payout_amount_difference"]
          ).toLocaleString()}`,
        },
      ];
    } else if (statsError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: statsError,
          message: "Failed to fetch stats, please try again later",
        }),
        type: false,
      });
    }

    return [];
  }, [statsResponse, statsError]);

  const revenueData = useMemo<RevenueData>(() => {
    if (revenueResponse?.status === 200) {
      const data = revenueResponse.data;
      return {
        total: {
          title: "Total Revenue",
          total: `NGN ${data.total_interest.toLocaleString()}`,
          percentage: Math.abs(Math.floor(data.percentage_change_total)),
          increase: data.percentage_change_total > 0,
          difference: `NGN ${data.interest_difference.toLocaleString()}`,
        },
        average: {
          title: "Average Revenue",
          total: `NGN ${data.average_interest.toLocaleString()}`,
          percentage: Math.abs(Math.floor(data.percentage_change_average)),
          increase: data.percentage_change_average > 0,
          difference: `NGN ${data.average_difference.toLocaleString()}`,
        },
        graph:
          data.chart.length > 0
            ? data.chart.map((item) => ({
                label: `${item.month ? months[item.month - 1] : ""} ${
                  item.year
                }`,
                value: item.interest,
              }))
            : months.map((item) => ({
                label: item,
                value: 0,
              })),
      };
    } else if (revenueError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: revenueError,
          message: "Failed to fetch earning trends, please try again later",
        }),
        type: false,
      });
    }

    return {
      total: {
        title: "Total Revenue",
        total: `NGN 0`,
        percentage: 0,
        increase: false,
        difference: `NGN 0`,
      },
      average: {
        title: "Average Revenue",
        total: `NGN 0`,
        percentage: 0,
        increase: false,
        difference: `NGN 0`,
      },
      graph: [],
    };
  }, [revenueResponse, revenueError]);

  const handleStatFilter = (start, end) => {
    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);
    setStatDates({ start: formattedStart, end: formattedEnd });
    fetchStatData(formattedStart, formattedEnd);
  };

  const handleGraphDatesFilter = (start, end) => {
    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);
    setGraphDates((prev) => ({
      ...prev,
      startDate: formattedStart,
      endDate: formattedEnd,
    }));
    fetchRevenueData({ start: formattedStart, end: formattedEnd });
  };

  const loading =
    fetchStatus.isPending ||
    payoutStatus.isPending ||
    statsStatus.isPending ||
    revenueStatus.isPending;

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
        stats={stats}
        statDateFilter={{
          start: statDates.start,
          end: statDates.end,
          onChange: handleStatFilter,
        }}
        graphDateFilter={{
          start: graphDates.start,
          end: graphDates.end,
          onChange: handleGraphDatesFilter,
        }}
        revenue={revenueData}
      />
    </>
  );
};

export { Finance };
