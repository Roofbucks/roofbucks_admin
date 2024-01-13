
import axios from "axios";
import { InternalAxiosRequestConfig } from "axios";
import { UsersUI } from "features";
import { UserTableItem } from "components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";


function Users() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  axiosInstance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
      const accessToken = localStorage.getItem("roofbucksAdminAccess");
      if (accessToken && config.headers) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  async function getRequest(request) {
    return await axiosInstance.get(request.url, request.config);
  }

  const [totalPages, setTotalPages] = useState(2);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState<UserTableItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('your search term');
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    status: { label: "", value: "" },
    accountType: { label: "", value: "" },
  });

  useEffect(function fetchData() {
    const userRequest = {
      url: `/admin/get_users/`,
      data: { search: searchTerm, page: currentPage },
    };

    async function fetchDataAsync() {
      try {
        const userDataResponse = await getRequest(userRequest);

        if (userDataResponse?.status === 200) {
          const userData = userDataResponse.data.results;
          setTotalUsers(userDataResponse?.data.total);
          setTotalPages(userDataResponse?.data.pages);
          setPageLimit(userDataResponse?.data.limit);

          const filteredList = userData
            .filter(function (item) {
              const accountTypeMatch =
                !filter.accountType.value ||
                item.role.toLowerCase() === filter.accountType.value.toLowerCase();
              const statusMatch =
                !filter.status.value ||
                item.status.toLowerCase() === filter.status.value.toLowerCase();

              return accountTypeMatch && statusMatch;
            })
            .map(function (item) {
              return {
                id: item.id,
                name: `${item.firstname} ${item.lastname}`,
                email: item.email,
                type: item.role.toLowerCase(),
                dateCreated: item.created_at.substring(0, 10),
                status: item.status.toLowerCase(),
              };
            });

          setUsers(filteredList);
          console.log(userDataResponse.data.results);
        }
      } catch (error) {
        console.log('An Error has Occurred');
      } finally {
        console.log('Successful!');
      }
    }

    fetchDataAsync();
  }, []);

  function handlePageChange(currentPage) {
    setCurrentPage(currentPage++);
  }

  function handleFilterUser(data) {
    console.log(data);
    setFilter({
      status: data.status,
      accountType: data.accountType,
    });
  }

  function handleView(id) {
    navigate(Routes.user(id));
  }

  function handleSearchUser(e) {
    setSearchUsers(function (prev) {
      return prev.filter(function (user) {
        return user.name.toLowerCase().includes(e.toLowerCase());
      });
    });

    if (e === "") {
      setSearchUsers(users);
    }
  }

  useEffect(function () {
    setSearchUsers(users);
  }, [users]);


  return (
    <>
      <UsersUI
        handleView={handleView}
        userList={users}
        handleFilter={handleFilterUser}
        handleSearch={handleSearchUser}
        pagination={{
          handleChange: handlePageChange,
          total: totalPages,
          current: currentPage,
          count: totalUsers,
          limit: pageLimit,
        }}
        searchUsers={searchUsers}
      />
    </>
  );
}

export { Users };








