import axios from "axios";
import { UserTableItem } from "components";
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
	const [users, setUsers] = useState<UserTableItem[]>([]);
	const [search, setSearch] = useState("");
	const [filterUsers, setFilterUsers] = useState<FilterData>({
		status: { label: "", value: "" },
		accountType: { label: "", value: "" },
	});
	const [pageData, setPageData] = useState({
		pageTotal: 1,
		usersDataTotal: 0,
		currentPage: 1,
		pageLimit: 0,
	});

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
						limit: pageData.pageLimit,
						role: filterUsers.accountType.value,
						status: filterUsers.status.value,
					},
				})
				.then((res) => {
					const pageInfo = res.data;
					const userData = res.data.results;
					setPageData((prev) => ({
						...prev,
						usersDataTotal: pageInfo.total,
						pageTotal: pageInfo.pages,
						pageLimit: pageInfo.limit,
					}));

					const userList: UserTableItem[] = userData.map((user) => ({
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
			currentPage: page,
		}));
	};

	const handleFilter = (data: any) => {
		setPageData((prev) => ({
			...prev,
			currentPage: 1,
		}));
		setFilterUsers({
			status: data.status,
			accountType: data.accountType,
		});
	};

	const handleSearch = (e: any) => {
		setPageData((prev) => ({
			...prev,
			currentPage: 1,
		}));
		setSearch(e);
	};

	const handleView = (id) => {
		navigate(Routes.user(id));
	};

	return (
		<>
			<UsersUI
				handleView={handleView}
				handleFilter={handleFilter}
				handleSearch={handleSearch}
				pagination={{
					handleChange: (currentPage) => handlePages(currentPage),
					total: pageData.pageTotal,
					current: pageData.currentPage,
					count: pageData.usersDataTotal,
					limit: pageData.pageLimit,
				}}
				users={[]}
				search={""}
				status={{
					label: undefined,
					value: undefined,
				}}
				role={{
					label: undefined,
					value: undefined,
				}} // users={users}
				// search={search}
			/>
		</>
	);
};

export { Users };
