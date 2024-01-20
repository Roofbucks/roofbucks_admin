// import { userService } from "api";
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
  const getRequest = async (request) => {
    const { url, config } = request;

    const accessToken = localStorage.getItem("roofbucksAdminAccess");
    const headers = config ? { ...config.headers } : {};

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const apiUrl = process.env.REACT_APP_API_BASE_URL + url;

      const response = await axios.get(apiUrl, { ...config, headers });
      return response;
  };

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
    const fetchData = async () => {
      let url = `/admin/get_users/?page=${currentPage}`;

      if (searchTerm) {
        url += `&search=${searchTerm}`;
      } else if (filter.accountType.value) {
        url += `&role=${filter.accountType.value.toUpperCase()}`;
      } else if (filter.status.value) {
        url += `&status=${filter.status.value.toUpperCase()}`;
      } else if (filter.accountType.value && filter.status.value) {
        url += `&status=${filter.status.value.toUpperCase()}&role=${filter.accountType.value.toUpperCase()}`
      }
  
      const request = {
        url: url,
      };
  
      const userDataResponse = await getRequest(request);
  
      if (userDataResponse?.status === 200) {
        const userData = userDataResponse.data.results;
        console.log(userData)
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
