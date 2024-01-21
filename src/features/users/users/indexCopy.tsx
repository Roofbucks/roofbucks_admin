import {
	EmptyTable,
	Pagination,
	Search,
	Table,
	TableHeaderItemProps,
	UserTable,
	UserTableItem,
	UsersFilter,
} from "components";
import styles from "./styles.module.scss";
import { EmptyStreet } from "assets";
import { useEffect, useState } from "react";

const tableHeaderTitles: TableHeaderItemProps[] = [
	{ title: "Name" },
	{ title: "Email" },
	{ title: "Account Type" },
	{ title: "Date Created" },
	{ title: "Status" },
	{ title: "" },
];

// const user: UserTableItem = {
// 	id: "123",
// 	name: "New user",
// 	email: "user@user.com",
// 	status: "verified",
// 	type: "agent",
// 	dateCreated: "12/08/2023",
// 	verifiedBusiness: true,
// };

interface UsersProps {
	handleView: (id: string) => void;
	userList: UserTableItem[];
	handleFilter: (data: any) => void;
	searchUsers: any;
	pagination: any;
	handleSearch: any;
}

const UsersUI: React.FC<UsersProps> = ({
	handleView,
	searchUsers,
	pagination,
	handleSearch,
	handleFilter,
}) => {
	const [value, setValue] = useState("");

	return (
		<>
			<h1 className={styles.ttl}>
				Users <span>(58)</span>
			</h1>
			<section className={styles.searchFilter}>
				<UsersFilter
					submit={handleFilter}
					value={{
						status: { label: "", value: "" },
						accountType: { label: "", value: "" },
					}}
				/>
				<Search
					className={styles.search}
					value={value}
					placeholder={"Search"}
					handleChange={(e) => {
						setValue(e);
						handleSearch(e);
					}}
				/>
			</section>
			<Table
				tableHeaderTitles={tableHeaderTitles}
				tableBody={
					<UserTable
						tableBodyItems={searchUsers}
						view={handleView}
						resendMail={console.log}
						tableBodyRowClassName={styles.tableBodyItem}
					/>
				}
				customTableClasses={{
					tableContainerClassName: styles.tableWrap,
					tableHeaderClassName: styles.tableHeader,
					tableHeaderItemClassName: styles.tableHeaderItem,
				}}
				emptyTable={{
					show: false,
					element: (
						<EmptyTable
							Vector={EmptyStreet}
							heading={"No user found"}
							text={"There are no users at this time"}
						/>
					),
				}}
			/>
			<Pagination
				currentPage={pagination.current}
				totalPages={pagination.total}
				handleChange={pagination.handleChange}
				totalCount={pagination.count}
				pageLimit={pagination.limit}
				name={"Users"}
			/>
		</>
	);
};

export { UsersUI };
