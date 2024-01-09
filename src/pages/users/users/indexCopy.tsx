import { userService } from "api";
import { UserTableItem } from "components";
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
  const { run: runUserData, data: userDataResponse, error } = useApiRequest({});
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

      const filteredList = userData
        .filter((item) => {
          const accountTypeMatch =
            !filter.accountType.value ||
            item.role.toLowerCase() === filter.accountType.value.toLowerCase();
          const statusMatch =
            !filter.status.value ||
            item.status.toLowerCase() === filter.status.value.toLowerCase();
          // const searchMatch = item.name
          //   ?.toLowerCase()
          //   .includes(searchTerm?.toLowerCase());

          return accountTypeMatch && statusMatch
        })
        .map((item) => ({
          id: item.id,
          name: `${item.firstname} ${item.lastname}`,
          email: item.email,
          type: item.role.toLowerCase(),
          dateCreated: item.created_at.substring(0, 10),
          status: item.status.toLowerCase(),
        }));
      setUsers(filteredList);
    } else if (error) {
      alert("Failed to get usersData, please try again later.");
    }
  }, [userDataResponse, error, filter]);

  const handlePages = (currentPage) => {
    setCurrentPage(currentPage++)
  };

  const handleFilter = (data: any) => {
    console.log("this is the data", data);
    setFilter({
      status: data.status,
      accountType: data.accountType,
    });
  };

  const handleSearch = (e) => {
    setSearchUsers((prev) => {
      return prev.filter((user) => {
        return user.name.toLowerCase().includes(e.toLowerCase());
      });
    });
    if (e === "") {
      setSearchUsers(users);
    }
  };

  useEffect(() => {
    setSearchUsers(users);
    runUserData(userService({ search: searchTerm, page: currentPage }));
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
