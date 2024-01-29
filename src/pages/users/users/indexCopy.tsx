import { userService } from "api";
import { UserTableItem } from "components";
import debounce from 'lodash/debounce';
import { UsersUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

interface filterOptionType {
  label?: any;
  value?: any;
}

interface FilterData {
  status: filterOptionType;
  accountType: filterOptionType;
}

const Users = () => {
  const { run: runUserData, data: userDataResponse } = useApiRequest({});
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState<UserTableItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterData>({
    status: { label: "", value: "" },
    accountType: { label: "", value: "" },
  });
  console.log(totalUsers, totalPages);

  useMemo(() => {
    if (userDataResponse?.status === 200) {
      const userData = userDataResponse.data.results;
      setTotalUsers(userDataResponse?.data.total);
      setTotalPages(userDataResponse?.data.pages);
      setPageLimit(userDataResponse?.data.limit);

      const userList = userData
      .map((item) => ({
        id: item.id,
        name: `${item.firstname} ${item.lastname}`,
        email: item.email,
        type: item.role.toLowerCase(),
        dateCreated: item.created_at.substring(0, 10),
        status: item.status.toLowerCase(),
      }));
    setUsers(userList);
  } else {
    console.log("there was an error");
  }
  }, [userDataResponse]);

  const handlePages = (currentPage) => {
    setCurrentPage(currentPage++)
  };

  const handleFilter = (data: any) => {
    setFilter({
      status: data.status,
      accountType: data.accountType,
    });
    setCurrentPage(1)
  };

  const debouncedHandleSearch = debounce((searchTerm: any) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
    console.log(searchTerm);
  }, 3000);
  
  const handleSearch = (e: any) => {
    debouncedHandleSearch(e);
  };

  useEffect(() => {
    setSearchUsers(users);
    runUserData(userService({ search: searchTerm, page: currentPage, filter: filter }));
  }, [currentPage]);
  useEffect(() => {
    setSearchUsers(users);
  }, [users]);

  const handleView = (id) => {
    navigate(Routes.user(id));
  };

  return (
    <>
      <UsersUI
        handleView={handleView}
        users={users}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        pagination={{
          handleChange: handlePages,
          total: totalPages,
          current: currentPage,
          count: totalUsers,
          limit: pageLimit
        }}
      />
    </>
  );
};

export { Users };
