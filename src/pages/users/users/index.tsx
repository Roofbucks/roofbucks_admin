// import { usersService } from "api";
// import { UserTableItem } from "components";
// import { UsersUI } from "features";
// import { useApiRequest } from "hooks/useApiRequest";
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Routes } from "router";

// const Users = () => {
// 	const [userList, setUserList] = useState([]);
// 	const navigate = useNavigate();
// 	const {
// 		run: runUsersList,
// 		data: response,
// 		error,
// 		requestStatus,
// 	} = useApiRequest({});

// 	const fetchData = () => {
// 		runUsersList(usersService());
// 	};
// 	useEffect(() => {
// 		fetchData();
// 		console.log("Page loaded");
// 	}, []);
// 	useMemo(() => {
// 		if (response && response.data) {
// 			const users = response.data.results;
// 			console.log(users);
// 			const actualUserList = users.map((user) => {
// 				return {
// 					id: user.id,
// 					name: `${user.firstname} ${user.lastname}`,
// 					email: user.email,
// 					status: user.status,
// 					type: user.role,
// 					dateCreated: user.created_at,
// 				};
// 			});
// 			setUserList(actualUserList);
// 			console.log(userList);
// 		} else {
// 			console.log(error);
// 		}
// 	}, [response, error]);

// 	const handleView = (id) => navigate(Routes.user(id));

// 	// 	{
// 	// 		name: "Kelvin",
// 	// 		email: "",
// 	// 		id: 1,
// 	// 	},
// 	// 	{
// 	// 		name: "Patrick",
// 	// 		email: "",
// 	// 		id: 2,
// 	// 	},
// 	// 	{
// 	// 		name: "Paul",
// 	// 		email: "",
// 	// 		id: 3,
// 	// 	},
// 	// ];
// 	// const resArr = sampleArr.map((sample) => {
// 	// 	return { name: sample.name, email: sample.email };
// 	// });
// 	// console.log(resArr);
// 	return (
// 		<>
// 			<UsersUI handleView={handleView} userList={userList} />
// 		</>
// 	);
// };

// export { Users };



import { usersService } from "api";
import { UsersUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { optionType } from "types";

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
    runUserData(usersService());
  }, []);

  useMemo(() => {
    if (userDataResponse?.status === 200) {
      const userData = userDataResponse.data.results;

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
          type: item.role,
          dateCreated: item.created_at.substring(0, 10),
          status: item.status
        }));

      setUsers(filteredList);
    } else if (error) {
      alert("Failed to get usersData, please try again later.");
    }
  }, [userDataResponse, error, filter]);

  const handleView = (id) => {
    navigate(Routes.user(id));
  };

  const handleFilter = (data) => {
    console.log("data gotten", data);
    setFilter({
      status: data.status,
      accountType: data.accountType,
    });
  };

  return (
    <>
      <UsersUI
        handleView={handleView}
        userList={users}
        handleFilter={handleFilter}
      />
    </>
  );
};

export { Users };