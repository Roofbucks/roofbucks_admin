import axios from "axios";
import debounce from 'lodash/debounce';
import { UsersUI } from "features";
import { useEffect, useState } from "react";
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
  const [totalPages, setTotalPages] = useState(2);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterData>({
    status: { label: "", value: "" },
    accountType: { label: "", value: "" },
  });

  useEffect(() => {
    const fetchData = () => {
      axios
        .get ("/admin/get_users/",{
          baseURL: process.env.REACT_APP_API_BASE_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "roofbucksAdminAccess"
            )}`,
          },
          params: {
            search: searchTerm,
            page: currentPage,
            limit: 10,
            role: filter.accountType.value.toUpperCase(),
            status: filter.status.value.toLowerCase(),
          },
        })
				.then((response) => {
					const userResults = response.data.results;
          setTotalUsers(response.data.total);
          setTotalPages(response.data.pages);
          setPageLimit(response.data.limit);

					const userList = userResults.map((user) => ({
						id: user.id,
						name: `${user.firstname} ${user.lastname}`,
						email: user.email,
						type: user.role.toLowerCase(),
						dateCreated: new Date(user.created_at).toLocaleDateString(),
						status: user.status.toLowerCase(),
						verifiedBusiness: user.business_verified,
					}));
					setUsers(userList);
				})
        .catch((error) => console.log(error))
				.finally(() => console.log("fetched data"));
    };
  
    fetchData();
  }, [currentPage, searchTerm, filter.accountType.value, filter.status.value]);
  

  const handlePages = (currentPage) => {
    setCurrentPage(currentPage++);
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
          limit: pageLimit,
        }}
      />
    </>
  );
};

export { Users };
