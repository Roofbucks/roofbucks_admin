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

interface UsersProps {
	handleView: (id: string) => void;
  users: UserTableItem[];
	handleFilter: (data) => void;
	pagination: {
    handleChange: (page) => void;
    total: number;
    current: number;
    count: number;
  };
}

const UsersUI: React.FC<UsersProps> = ({ handleView, users, handleFilter, pagination }) => {
  const [searchUsers, setSearchUsers] = useState<UserTableItem[]>([]);
  const [val, setVal] = useState("");
	useEffect(() => {
		setSearchUsers(users);
  }, [users]);

  const searchClients = (e) => {
		setSearchUsers((prev) => {
			return prev.filter((user) => {
				return user.name.toLowerCase().includes(e.toLowerCase());
			});
		});
		if (e === "") {
			setSearchUsers(users);
		}
  };

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
					value={val}
					placeholder={"Search"}
					handleChange={(e) => {
            searchClients(e);
            setVal(e);
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
				totalCount={20}
				pageLimit={20}
				name={"Users"}
			/>
		</>
	);
};

export { UsersUI };