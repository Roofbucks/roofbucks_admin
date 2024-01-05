import { userService } from "api";
import { UserTableItem } from "components";
import { UsersUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Users = () => {
  interface filterOptionType {
    label?: any;
    value?: any;
  }

  interface FilterData {
    status: filterOptionType;
    accountType: filterOptionType;
  }

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState<FilterData>({
    status: { label: "", value: "" },
    accountType: { label: "", value: "" },
  });

  const navigate = useNavigate();
  const { run: runUserData, data: userDataResponse, error } = useApiRequest({});

  useEffect(() => {
    runUserData(userService());
  }, []);

  useMemo(() => {
    if (userDataResponse?.status === 200) {
      const userData = userDataResponse.data.results;
      console.log(userData)

      const filteredList = userData
        .filter((item) => {
          const accountTypeMatch =
            !filter.accountType.value ||
            item.role.toLowerCase() === filter.accountType.value.toLowerCase();

          const statusMatch =
            !filter.status.value || item.status.toLowerCase() === filter.status.value.toLowerCase();

          return accountTypeMatch && statusMatch;
        })
        .map((item) => ({
          id: item.id,
          name: `${item.firstname} ${item.lastname}`,
          email: item.email,
          type: item.role.toLowerCase(),
          dateCreated: item.created_at.substring(0, 10),
          status: item.status.toLowerCase(),
          // Include any additional details you need here
        }));

      setUsers(filteredList);
    } else if (error) {
      alert("Failed to get usersData, please try again later.");
    }
  }, [userDataResponse, error, filter]);

  const handleView = (id) => {
    navigate(Routes.user(id));
  };

  const handleFilter = (data: any) => {
    console.log("this is the data", data);
    setFilter({
      status: data.status,
      accountType: data.accountType,
    });
  };

  return (
    <>
      <UsersUI
        handleView={handleView}
        users={users}
        handleFilter={handleFilter}
      />
    </>
  );
};

export { Users };
