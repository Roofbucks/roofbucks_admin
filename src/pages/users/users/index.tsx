import axios from "axios";
import { UsersUI } from "features";
import { useEffect, useState, useMemo } from "react";
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
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [filterUsers, setFilterUsers] = useState<FilterData>({
		status: { label: "", value: "" },
		accountType: { label: "", value: "" },
	});
	const [pageData, setPageData] = useState({
		pageTotal: 1,
		usersDataTotal: 0,
		currentPage: 1,
		pageLimit: 10,
	});
	console.log(pageData);

	useEffect(() => {
		const fetchUsers = () => {
			axios
				.get("/admin/get_users/", {
					baseURL: process.env.REACT_APP_API_BASE_URL,
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"roofbucksAdminAccess"
						)}`,
					},
					params: {
						search: search,
						page: pageData.currentPage,
						limit: 10,
						role: filterUsers.accountType.value,
						status: filterUsers.status.value,
					},
				})
				.then((res) => {
					const pageInfo = res.data;
					console.log(pageInfo);
					const userData = res.data.results;
					setPageData((prev) => ({
						...prev,
						usersDataTotal: pageInfo.total,
						pageTotal: pageInfo.pages,
						pageLimit: pageInfo.limit,
					}));

					const userList = userData.map((user) => ({
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
				.catch((err) => console.log(err))
				.finally(() => console.log("done"));
		};
		fetchUsers();
	}, [
		search,
		filterUsers.accountType.value,
		filterUsers.status.value,
		pageData.currentPage,
	]);

	const navigate = useNavigate();

	const handlePages = (page) => {
		setPageData((prev) => ({
			...prev,
			currentPage: page < pageData.pageTotal ? (page += 1) : (page -= 1),
		}));
	};

	const handleFilter = (data: any) => {
		setFilterUsers({
			status: data.status,
			accountType: data.accountType,
		});
	};

	const handleSearch = (e: any) => {
		setSearch(e);
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
					handleChange: () => handlePages(pageData.currentPage),
					total: pageData.pageTotal,
					current: pageData.currentPage,
					count: pageData.usersDataTotal,
					limit: pageData.pageLimit,
				}}
			/>
		</>
	);
};

export { Users };
