import React, { useEffect, useState } from "react";
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

interface UsersProps {
  handleView: (id: string) => void;
  handleFilter: (data) => void;
  userList: UserTableItem[];
  handleSearch:(e : any) => void;
  pagination: {
    handleChange: (currentPage: any) => void;
    total: number;
    current: number;
    count: number;
    limit: number;
  }
  searchUsers: UserTableItem[];
}

const tableHeaderTitles: TableHeaderItemProps[] = [
  { title: "Name" },
  { title: "Email" },
  { title: "Account Type" },
  { title: "Date Created" },
  { title: "Status" },
  { title: "" },
];

const UsersUI: React.FC<UsersProps> = ({ handleView, userList, handleFilter, handleSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchUserList, setSearchUserList] = useState<UserTableItem[]>(userList);

  useEffect(() => {
    setSearchUserList(userList);
  }, [userList]);

  const filterMembers = (inputValue: string) => {
    if (inputValue === "") {
      setSearchUserList(userList);
    } else {
      setSearchUserList((prev) => {
        const filteredUsers = prev.filter((user) =>
          user.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        if (filteredUsers.length === 0) {
          console.log("No user found");
        }
        return filteredUsers;
      });
    }
  };


  return (
    <>
      <h1 className={styles.ttl}>
        Users <span>(58)</span>
      </h1>
      <section className={styles.searchFilter}>
        <UsersFilter
          submit={handleFilter}
          value={{
            status: { label: "", value: "" },
            accountType: { label: "", value: "" },
          }}
        />
        <Search
          className={styles.search}
          value={searchValue}
          placeholder={"Search"}
          handleChange={(e) => {
            setSearchValue(e);
            filterMembers(e);
          }}
        />
      </section>
      <Table
        tableHeaderTitles={tableHeaderTitles}
        tableBody={
          <UserTable
            tableBodyItems={searchUserList}
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
          show: searchUserList.length === 0,
          element: (
            <EmptyTable
              Vector={EmptyStreet}
              heading={"No user found"}
              text={"There are no users at this time"}
            />
          ),
        }}
      />
      <Pagination
        currentPage={1}
        totalPages={3}
        handleChange={() => {}}
        totalCount={22}
        pageLimit={10}
        name={"Users"}
      />
    </>
  );
};

export { UsersUI };
