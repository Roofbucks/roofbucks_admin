import {
  EmptyTable,
  FinanceFilter,
  Pagination,
  Search,
  Table,
  TableHeaderItemProps,
  TransactionTable,
  TransactionTableItem,
} from "components";
import styles from "./styles.module.scss";
import { EmptyStreet } from "assets";
import { optionType } from "types";

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
  return (
    <>
      <h1 className={styles.ttl}>
        Financial Transactions <span>({pagination.totalCount})</span>
      </h1>
      <section>
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

export { FinanceUI };
