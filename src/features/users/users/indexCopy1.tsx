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
import { useState } from "react";

const tableHeaderTitles: TableHeaderItemProps[] = [
	{ title: "Name" },
	{ title: "Email" },
	{ title: "Account Type" },
	{ title: "Date Created" },
	{ title: "Status" },
	{ title: "" },
];

interface UsersProps {
	handleView: (id: string) => void;
	users: UserTableItem[];
	handleFilter: (data) => void;
	handleSearch: (data: any) => void;
	pagination: {
		handleChange: (page) => void;
		total: number;
		current: number;
		count: number;
		limit: number;
	};
	search: string;
}

const UsersUI: React.FC<UsersProps> = ({
	handleView,
	users,
	handleFilter,
	pagination,
	handleSearch,
	search,
}) => {

	return (
		<>
			<h1 className={styles.ttl}>
				Users <span>({pagination.count})</span>
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
					value={search}
					placeholder={"Search"}
					handleChange={handleSearch}
				/>
			</section>
			<Table
				tableHeaderTitles={tableHeaderTitles}
				tableBody={
					<UserTable
						tableBodyItems={users}
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
					show: users.length === 0,
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
