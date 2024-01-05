import { usersService } from "api";
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
	const [userList, setUserList] = useState([]);
	const [filter, setFilter] = useState<FilterData>({
		status: { label: "", value: "" },
		accountType: { label: "", value: "" },
	});
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
	useEffect(() => {
		fetchData();
	}, []);
	useMemo(() => {
		if (response?.status === 200) {
			const users = response.data.results;
			const filteredList = users
				.filter((item) => {
					const accountTypeMatch =
						!filter.accountType.value ||
						item.role.toLowerCase() === filter.accountType.value.toLowerCase();

					const statusMatch =
						!filter.status.value ||
						item.status.toLowerCase() === filter.status.value.toLowerCase();

					return accountTypeMatch && statusMatch;
				})
				.map((user) => {
					return {
						id: user.id,
						name: `${user.firstname} ${user.lastname}`,
						email: user.email,
						status: user.status,
						type: user.role,
						dateCreated: user.created_at.slice(0, 10),
					};
				});
			setUserList(filteredList);
			console.log("page loaded");
		} else {
			console.log("error occurred");
		}
	}, [response, error, filter]);

	const handleView = (id) => navigate(Routes.user(id));
	const handleFilter = (data) => {
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
				userList={userList}
				handleFilter={handleFilter}
			/>
		</>
	);
};

export { Users };
