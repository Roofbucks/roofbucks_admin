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

const tableHeaderTitles: TableHeaderItemProps[] = [
  { title: "Property" },
  { title: "Amount" },
  { title: "Transaction Type" },
  { title: "User" },
  { title: "Date" },
];

const transaction: TransactionTableItem = {
  id: "123",
  date: "11/11/2023",
  amount: "NGN 200,000,000",
  type: "deposit",
  property: "Mukola House",
  propertyId: "1234",
  user: "Jason Douglas",
};

const transactions: TransactionTableItem[] = [
  ...new Array(4).fill(transaction),
  ...new Array(2).fill({ ...transaction, type: "rent" }),
  ...new Array(2).fill({ ...transaction, type: "investment" }),
  ...new Array(2).fill({ ...transaction, type: "buy-back" }),
];

const FinanceUI = () => {
  return (
    <>
      <h1 className={styles.ttl}>
        Financial Transactions <span>(58)</span>
      </h1>
      <section>
        <section className={styles.searchFilter}>
          <FinanceFilter submit={console.log} type={{ label: "", value: "" }} />
          <Search
            className={styles.search}
            value={""}
            placeholder={"Search by property name"}
            handleChange={console.log}
          />
        </section>
        <Table
          tableHeaderTitles={tableHeaderTitles}
          tableBody={
            <TransactionTable
              tableBodyItems={transactions}
              handleViewProperty={console.log}
              tableBodyRowClassName={styles.tableBodyItem}
            />
          }
          customTableClasses={{
            tableContainerClassName: styles.tableWrap,
            tableHeaderClassName: styles.tableHeader,
            tableHeaderItemClassName: styles.tableHeaderItem,
          }}
          emptyTable={{
            show: false,
            element: (
              <EmptyTable
                Vector={EmptyStreet}
                heading={"No transactions found"}
                text={"There are no transactions at this time"}
              />
            ),
          }}
        />
        <Pagination
          currentPage={1}
          totalPages={3}
          handleChange={console.log}
          totalCount={21}
          pageLimit={10}
          name={"Team Members"}
        />
      </section>
    </>
  );
};

export { FinanceUI };
