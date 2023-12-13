import {
  EmptyTable,
  Pagination,
  Search,
  Table,
  TableHeaderItemProps,
  UserTable,
  UserTableItem,
  UsersFilter,
} from "components";
import styles from "./styles.module.scss";
import { EmptyStreet } from "assets";
import { optionType } from "types";

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

interface UsersProps {
  handleView: (id: string) => void;
  users: UserTableItem[];
  search: {
    value: string;
    handleChange: (search: string) => void;
  };
  accountType: {
    value: optionType | undefined;
    handleChange: (val) => void;
  };
  status: {
    value: optionType | undefined;
    handleChange: (val) => void;
  };
  pagination: {
    handleChange: (page: number) => void;
    totalPages: number;
    currentPage: number;
    totalCount: number;
    pageLimit: number;
  };
}

const UsersUI: React.FC<UsersProps> = ({
  handleView,
  users,
  pagination,
  search,
  status,
  accountType,
}) => {
  return (
    <>
      <h1 className={styles.ttl}>
        Users <span>(58)</span>
      </h1>
      <section className={styles.searchFilter}>
        <UsersFilter
          submit={(data) => {
            console.log(data);
            status.handleChange(data.status);
            accountType.handleChange(data.accountType);
          }}
          status={status.value}
          accountType={accountType.value}
        />
        <Search
          className={styles.search}
          value={search.value}
          placeholder={"Search"}
          handleChange={search.handleChange}
        />
      </section>
      <Table
        tableHeaderTitles={tableHeaderTitles}
        tableBody={
          <UserTable
            tableBodyItems={users}
            view={handleView}
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
          show: users.length === 0,
          element: (
            <EmptyTable
              Vector={EmptyStreet}
              heading={"No user found"}
              text={"There are no users at this time"}
            />
          ),
        }}
      />
      <Pagination {...pagination} name={"Users"} />
    </>
  );
};

export { UsersUI };
