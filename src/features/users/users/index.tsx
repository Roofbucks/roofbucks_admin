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
}

const UsersUI: React.FC<UsersProps> = ({ handleView, userList }) => {
	const [value, setValue] = useState("");
	return (
		<>
			<h1 className={styles.ttl}>
				Users <span>(58)</span>
			</h1>
			<section className={styles.searchFilter}>
				<UsersFilter
					submit={console.log}
					value={{
						status: { label: "", value: "" },
						accountType: { label: "", value: "" },
					}}
				/>
				<Search
					className={styles.search}
					value={value}
					placeholder={"Search"}
					handleChange={(e) => setValue(e)}
				/>
			</section>
			<Table
				tableHeaderTitles={tableHeaderTitles}
				tableBody={
					<UserTable
						tableBodyItems={userList}
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
				currentPage={1}
				totalPages={3}
				handleChange={() => {}}
				totalCount={22}
				pageLimit={10}
				name={"Users"}
			/>
		</>
	);
};

export { UsersUI };
