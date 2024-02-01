import axios from "axios";
import debounce from 'lodash/debounce';
import { UsersUI } from "features";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { Preloader, UserTableItem } from "components";

interface FilterData {
  status: {
    label?: any;
    value?: any;
  };
  accountType: {
    label?: any;
    value?: any;
  };
}

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(2);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<UserTableItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterData>({
    status: { label: "", value: "" },
    accountType: { label: "", value: "" },
  });

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
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

					const userList: UserTableItem[] = userResults.map((user) => ({
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
        .finally(() => {
          setLoading(false)
          console.log("fetched data")
        });
    };
  
    fetchData();
  }, [currentPage, searchTerm, filter.accountType.value, filter.status.value]);
  

  const handlePages = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleFilter = (data: FilterData) => {
    setFilter({
      status: data.status,
      accountType: data.accountType,
    });
    setCurrentPage(1)
  };
  
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

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
        role={filter.accountType}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        pagination={{
          handleChange: handlePages,
          total: totalPages,
          current: currentPage,
          count: totalUsers,
          limit: 10,
        }}
      />
    </>
  );
};

export { Users };
