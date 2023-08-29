import {
  EmptyTable,
  Search,
  Table,
  TableHeaderItemProps,
  UserTable,
  UserTableItem,
  UsersFilter,
} from "components";
import styles from "./styles.module.scss";
import { EmptyStreet } from "assets";
import { TypeFlags } from "typescript";

const tableHeaderTitles: TableHeaderItemProps[] = [
  { title: "Name" },
  { title: "Email" },
  { title: "Account Type" },
  { title: "Date Created" },
  { title: "Status" },
  { title: "" },
];

const user: UserTableItem = {
  id: "123",
  name: "New user",
  email: "user@user.com",
  status: "verified",
  type: "agent",
  dateCreated: "12/08/2023",
  verifiedBusiness: true,
};

const UsersUI = () => {
  return (
    <>
      <h1 className={styles.ttl}>
        Users <span>(58)</span>
      </h1>
      <section className={styles.searchFilter} >
        <UsersFilter
          submit={console.log}
          value={{
            status: { label: "", value: "" },
            accountType: { label: "", value: "" },
          }}
        />
        <Search
          className={styles.search}
          value={""}
          placeholder={"Search"}
          handleChange={console.log}
        />
      </section>
      <Table
        tableHeaderTitles={tableHeaderTitles}
        tableBody={
          <UserTable
            tableBodyItems={new Array(10).fill(user)}
            view={console.log}
            resendMail={console.log}
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
              heading={"No user found"}
              text={"There are no users at this time"}
            />
          ),
        }}
      />
    </>
  );
};

export { UsersUI };
