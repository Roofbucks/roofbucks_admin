import { EmptyStreet } from "assets";
import styles from "./styles.module.scss";
import {
  EmptyTable,
  Pagination,
  Table,
  TableHeaderItemProps,
  PropertyTable,
  PropertyTableItem,
  Search,
  PropertiesFilter,
} from "components";

const tableHeaderTitles: TableHeaderItemProps[] = [
  { title: "ID" },
  { title: "Property Name" },
  { title: "Agent" },
  { title: "Amount" },
  { title: "Date Created" },
  { title: "Status" },
  { title: "" },
];

interface PropertiesProps {
  properties: PropertyTableItem[];
  handleView: (id: string) => void;
  handleFilter: (data) => void;
  handleSearch: (data: any) => void;
  searchTerm: string;
  pagination: {
    handleChange: (page) => void;
    total: number;
    current: number;
    count: number;
    limit: number;
  };
  status: {
    label?: any;
    value?: any;
  };
  startDate: string;
  endDate: string;
}

const PropertiesUI: React.FC<PropertiesProps> = ({
  properties,
  handleView,
  handleFilter,
  handleSearch,
  status,
  startDate,
  endDate,
  searchTerm,
  pagination,
  
}) => {
  return (
    <>
      <h1 className={styles.ttl}>
        Properties <span>({pagination.count})</span>
      </h1>
      <section className={styles.searchFilter}>
        <PropertiesFilter
          submit={handleFilter}
          value={{
            status: { label: "", value: status.value },
            startDate: startDate,
            endDate: endDate,
          }}
        />
        <Search
          className={styles.search}
          value={searchTerm}
          placeholder={"Search by id, property or agent"}
          handleChange={(e) => {
            handleSearch(e);
          }}
        />
      </section>
      <Table
        tableHeaderTitles={tableHeaderTitles}
        tableBody={
          <PropertyTable
            tableBodyItems={properties}
            view={handleView}
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
        name={"Properties"}
      />
    </>
  );
};

export { PropertiesUI };
