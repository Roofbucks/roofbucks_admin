import { usersService } from "api";
import { UserTableItem } from "components";
import { UsersUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Users = () => {
	const [userList, setUserList] = useState([]);
	const navigate = useNavigate();
	const {
		run: runUsersList,
		data: response,
		error,
		requestStatus,
	} = useApiRequest({});

	const fetchData = () => {
		runUsersList(usersService());
	};
	useMemo(() => {
		if (response && response.data) {
			const users = response.data.results;
			console.log(users);
			const actualUserList = users.map((user) => {
				return {
					id: user.id,
					name: `${user.firstname} ${user.lastname}`,
					email: user.email,
					status: user.status,
					type: user.role,
					dateCreated: user.created_at,
				};
			});
			setUserList(actualUserList);
			console.log(userList);
		} else {
			console.log(error);
		}
	}, []);
	useEffect(() => {
		fetchData();
	}, []);

	const handleView = (id) => navigate(Routes.user(id));

	// 	{
	// 		name: "Kelvin",
	// 		email: "",
	// 		id: 1,
	// 	},
	// 	{
	// 		name: "Patrick",
	// 		email: "",
	// 		id: 2,
	// 	},
	// 	{
	// 		name: "Paul",
	// 		email: "",
	// 		id: 3,
	// 	},
	// ];
	// const resArr = sampleArr.map((sample) => {
	// 	return { name: sample.name, email: sample.email };
	// });
	// console.log(resArr);
	return (
		<>
			<UsersUI handleView={handleView} userList={userList} />
		</>
	);
};

export { Users };
