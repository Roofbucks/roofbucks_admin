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

export interface RevenueData {
  average: StatInfo;
  total: StatInfo;
  graph: { label: string; value: number }[];
}

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
  stats: StatInfo[];
  statDateFilter: {
    start: string;
    end: string;
    onChange: (start, end) => void;
  };
  graphDateFilter: {
    start: string;
    end: string;
    onChange: (start, end) => void;
  };
  revenue: RevenueData;
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
  stats,
  statDateFilter,
  graphDateFilter,
  revenue,
}) => {
  return (
    <>
      <h1 className={styles.ttl}>Your Finances</h1>
      <section className={styles.transactionVolume}>
        <p className={styles.sectionTtl}>Transaction Volume</p>
        <div>
          <MyDateRangePicker
            className={styles.statRange}
            startDate={statDateFilter.start}
            endDate={statDateFilter.end}
            handleChange={statDateFilter.onChange}
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
            startDate={graphDateFilter.start}
            endDate={graphDateFilter.end}
            handleChange={graphDateFilter.onChange}
          />

          <div className={styles.revenueWrapper}>
            <div className={styles.summarySec}>
              <StatCard {...revenue.total} />
              <StatCard {...revenue.average} />
            </div>
            <div className={styles.trendsChart}>
              <Graph
                labels={revenue.graph.map((item) => item.label)}
                values={revenue.graph.map((item) => item.value)}
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <p className={styles.sectionTtl}>
          Financial Transactions <span>({pagination.totalCount})</span>
        </p>
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
  difference: number | string;
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
