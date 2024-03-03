import {
  EmptyTable,
  FinanceFilter,
  MyDateRangePicker,
  Pagination,
  Search,
  Table,
  TableHeaderItemProps,
  TransactionTable,
  TransactionTableItem,
} from "components";
import styles from "./styles.module.scss";
import { ChevronIcon, EmptyStreet, MoneyBagIcon2 } from "assets";
import { optionType } from "types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "chart.js/auto";

ChartJS.unregister();
ChartJS.register(ArcElement, Tooltip, Legend, Filler);
ChartJS.defaults.font.family = "inherit";
ChartJS.defaults.font.size = 18;

const tableHeaderTitles: TableHeaderItemProps[] = [
  { title: "Property" },
  { title: "Amount" },
  { title: "Transaction Type" },
  { title: "User" },
  { title: "Status" },
  { title: "Date" },
];

interface FinanceUIProps {
  transactions: TransactionTableItem[];
  pagination: {
    handleChange: (page: number) => void;
    totalPages: number;
    currentPage: number;
    totalCount: number;
    pageLimit: number;
  };
  search: {
    value: string;
    handleChange: (search: string) => void;
  };
  type: optionType | undefined;
  status: optionType | undefined;
  date: { start; end } | undefined;
  handleFilter: ({
    status,
    date,
    type,
  }: {
    status: optionType;
    type: optionType;
    date: { start: string; end: string };
  }) => void;
  handleViewProperty: (id) => void;
  handlePayAgent: (id) => void;
}

const FinanceUI: React.FC<FinanceUIProps> = ({
  transactions,
  pagination,
  status,
  type,
  search,
  date,
  handleFilter,
  handleViewProperty,
  handlePayAgent,
}) => {
  const stats: StatInfo[] = [
    {
      title: "Total Transactions",
      total: pagination.totalCount,
      percentage: 10,
      increase: true,
      difference: 5,
    },
    {
      title: "Total Deposits",
      total: `NGN 500`,
      percentage: 10,
      increase: true,
      difference: 5,
    },
    {
      title: "Total Investments",
      total: `NGN 500`,
      percentage: 10,
      increase: true,
      difference: 5,
    },
    {
      title: "Total Rent",
      total: `NGN 500`,
      percentage: 10,
      increase: true,
      difference: 5,
    },
    {
      title: "Total Buy-back",
      total: `NGN 500`,
      percentage: 10,
      increase: true,
      difference: 5,
    },
    {
      title: "Total Rent Payout",
      total: `NGN 500`,
      percentage: 10,
      increase: true,
      difference: 5,
    },
    {
      title: "Total Deposit Payout",
      total: `NGN 500`,
      percentage: 10,
      increase: false,
      difference: 5,
    },
    {
      title: "Total Buy-back Payout",
      total: `NGN 500`,
      percentage: 10,
      increase: true,
      difference: 5,
    },
  ];

  const totalRevenue = {
    title: "Total Revenue",
    total: `NGN 50000`,
    percentage: 10,
    increase: true,
    difference: 5,
  };

  const avgRevenue = {
    title: "Average Revenue",
    total: `NGN 500000`,
    percentage: 10,
    increase: true,
    difference: 5,
  };

  return (
    <>
      <h1 className={styles.ttl}>Your Finances</h1>
      <section className={styles.transactionVolume}>
        <p className={styles.sectionTtl}>Transaction Volume</p>
        <div>
          <MyDateRangePicker
            className={styles.statRange}
            startDate={""}
            endDate={""}
            handleChange={console.log}
          />
          <div className={`${styles.statList} ${styles.secWrap}`}>
            {stats.map((item, index) => (
              <StatCard {...item} key={index} />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.revenue}>
        <p className={styles.sectionTtl}>Revenue Generated</p>
        <div>
          <MyDateRangePicker
            className={styles.statRange}
            startDate={""}
            endDate={""}
            handleChange={console.log}
          />

          <div className={styles.revenueWrapper}>
            <div className={styles.summarySec}>
              <StatCard {...totalRevenue} />
              <StatCard {...avgRevenue} />
              {/* <div className={styles.summary}>
                <div className={styles.summaryIconSec}>
                  <MoneyBagIcon2 className={styles.summaryIcon} />
                </div>
                <div>
                  <p className={styles.summaryValue}>NGN 500,000</p>
                  <p className={styles.summaryLabel}>Avg. Revenue</p>
                </div>
              </div>
              <div className={styles.summary}>
                <div className={styles.summaryIconSec}>
                  <MoneyBagIcon2 className={styles.summaryIcon} />
                </div>
                <div>
                  <p className={styles.summaryValue}>NGN 500,000</p>
                  <p className={styles.summaryLabel}>Total Revenue</p>
                </div>
              </div> */}
            </div>
            <div className={styles.trendsChart}>
              <Graph
                labels={[
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
                ]}
                values={[45, 30, 20, 42, 60, 16, 72, 34, 58, 102, 41, 30]}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <p className={styles.sectionTtl}>Financial Transactions <span>({pagination.totalCount})</span></p>
        <section className={styles.searchFilter}>
          <FinanceFilter
            submit={(data) => {
              handleFilter({
                status: data.status,
                type: data.type,
                date: { start: data.startDate, end: data.endDate },
              });
            }}
            value={{
              status: status ?? { label: "", value: "" },
              type: type ?? { label: "", value: "" },
              startDate: date ? date?.start : "",
              endDate: date ? date?.end : "",
            }}
          />
          <Search
            className={styles.search}
            {...search}
            placeholder={"Search by property name"}
          />
        </section>
        <Table
          tableHeaderTitles={tableHeaderTitles}
          tableBody={
            <TransactionTable
              tableBodyItems={transactions}
              handleViewProperty={handleViewProperty}
              tableBodyRowClassName={styles.tableBodyItem}
              handlePayAgent={handlePayAgent}
            />
          }
          customTableClasses={{
            tableContainerClassName: styles.tableWrap,
            tableHeaderClassName: styles.tableHeader,
            tableHeaderItemClassName: styles.tableHeaderItem,
          }}
          emptyTable={{
            show: transactions.length === 0,
            element: (
              <EmptyTable
                Vector={EmptyStreet}
                heading={"No transactions found"}
                text={"There are no transactions at this time"}
              />
            ),
          }}
        />
        <Pagination {...pagination} name={"Transactions"} />
      </section>
    </>
  );
};

export interface StatInfo {
  title: string;
  total: number | string;
  percentage: number;
  increase: boolean;
  difference: number;
}

const StatCard: React.FC<StatInfo> = ({
  title,
  total,
  percentage,
  increase,
  difference,
}) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statInfo}>
        <p className={styles.statTxt1}>{title}</p>
        <p className={styles.statTxt2}>{total}</p>
        <p className={styles.statTxt3}>
          <span>{difference}</span> ({percentage}%){" "}
          <ChevronIcon className={!increase ? styles.downwardRed : ""} />
        </p>
      </div>
    </div>
  );
};

interface GraphProps {
  labels: string[];
  values: number[];
}
const Graph: React.FC<GraphProps> = ({ labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "NGN",
        data: values,
        backgroundColor: "rgba(221, 227, 221, 1)",
        hoverBackgroundColor: "rgb(15, 201, 75)",
        borderRadius: 7,
        barPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            return "NGN" + value;
          },
        },
        display: false,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const config = {
    type: "bar",
    data: data,
    options: options,
  };

  return (
    <>
      <Bar {...config} />
    </>
  );
};

export { FinanceUI };
