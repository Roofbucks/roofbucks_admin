import { userService } from "api";
import debounce from 'lodash/debounce';
import { UsersUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { Preloader } from "components";

interface FilterData {
  status: {
    label?: any;
    value?: any;
  };
  role: {
    label?: any;
    value?: any;
  };
}

const Users = () => {
  const { run: runUserData, data: userDataResponse, requestStatus } = useApiRequest({});
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterData>({
    status: { label: "", value: "" },
    role: { label: "", value: "" },
  });

  useMemo(() => {
    if (userDataResponse?.status === 200) {
      const userData = userDataResponse.data.results;
      setTotalUsers(userDataResponse?.data.total);
      setTotalPages(userDataResponse?.data.pages);

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
    setCurrentPage(currentPage)
  };

  const handleFilter = (data: any) => {
    setFilter({
      status: data.status,
      role: data.accountType,
    });
    setCurrentPage(1)
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  useEffect(() => {
    runUserData(userService({
      searchTerm: searchTerm,
      currentPage: currentPage,
      role: filter.role.value,
      status: filter.status.value,
      limit: 10
    }));
  }, [currentPage, filter, searchTerm]);

  useEffect(() => {
    setLoading(requestStatus.isPending);
  }, [requestStatus]);
  const handleView = (id) => {
    navigate(Routes.user(id));
  };



  return (
    <>
      <Preloader loading={loading}/>
      <UsersUI
        handleView={handleView}
        users={users}
        handleFilter={handleFilter}
        status={filter.status}
        role={filter.role}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        pagination={{
          handleChange: handlePages,
          total: totalPages,
          current: currentPage,
          count: totalUsers,
          limit: 10
        }}
      />
    </>
  );
};

export { Users };
