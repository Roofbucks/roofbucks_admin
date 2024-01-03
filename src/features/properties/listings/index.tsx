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
  ListingApplicationTableItem,
  ListingApplicationTable,
} from "components";
import { optionType } from "types";

const tableHeaderTitles: TableHeaderItemProps[] = [
  { title: "ID" },
  { title: "Property Name" },
  { title: "Agent" },
  { title: "Amount" },
  { title: "Date Created" },
  { title: "Status" },
  { title: "" },
];

const applicationTableHeaderTitles: TableHeaderItemProps[] = [
  { title: "Property/Agent" },
  { title: "Applicant" },
  { title: "Location" },
  { title: "Percentage" },
  { title: "Date" },
  { title: "" },
];

interface PropertiesProps {
  handleViewProperty: (id: string) => void;
  handleViewApplication: (id: string) => void;
  properties: PropertyTableItem[];
  applications: ListingApplicationTableItem[];
  tab: {
    value: string;
    handleChange: (tab: string) => void;
  };
  count: {
    all: number;
    applications: number;
  };
  search: {
    value: string;
    handleChange: (search: string) => void;
  };
  pagination: {
    handleChange: (page: number) => void;
    totalPages: number;
    currentPage: number;
    totalCount: number;
    pageLimit: number;
  };
  date: {
    value: { start; end } | undefined;
    handleChange: (val: { start: string; end: string }) => void;
  };
}

const ListingsUI: React.FC<PropertiesProps> = ({
  handleViewProperty,
  handleViewApplication,
  properties,
  tab,
  count,
  search,
  pagination,
  date,
  applications,
}) => {
  return (
    <>
      <h1 className={styles.ttl}>Property Listings</h1>
      <section className={styles.tabs}>
        <span
          role="button"
          onClick={() => tab.handleChange("properties")}
          className={tab.value === "properties" ? styles.active : ""}
        >
          Properties ({count.all})
        </span>
        <span
          role="button"
          onClick={() => tab.handleChange("applications")}
          className={tab.value === "applications" ? styles.active : ""}
        >
          Applications ({count.applications})
        </span>
      </section>
      <section className={styles.searchFilter}>
        <PropertiesFilter
          statusOptions={[]}
          hideStatus
          submit={(data) => {
            date.handleChange({ start: data.startDate, end: data.endDate });
          }}
          value={{
            status: { label: "", value: "" },
            startDate: date.value ? date.value?.start : "",
            endDate: date.value ? date.value?.end : "",
          }}
        />
        <Search
          className={styles.search}
          value={search.value}
          placeholder={"Search by property or agent"}
          handleChange={search.handleChange}
        />
      </section>
      {tab.value === "properties" ? (
        <Table
          tableHeaderTitles={tableHeaderTitles}
          tableBody={
            <PropertyTable
              tableBodyItems={properties}
              view={handleViewProperty}
              tableBodyRowClassName={styles.tableBodyItem}
            />
          }
          customTableClasses={{
            tableContainerClassName: styles.tableWrap,
            tableHeaderClassName: styles.tableHeader,
            tableHeaderItemClassName: styles.tableHeaderItem,
          }}
          emptyTable={{
            show: properties.length === 0,
            element: (
              <EmptyTable
                Vector={EmptyStreet}
                heading={"No listings found"}
                text={""}
              />
            ),
          }}
        />
      ) : (
        <Table
          tableHeaderTitles={applicationTableHeaderTitles}
          tableBody={
            <ListingApplicationTable
              tableBodyItems={applications}
              view={handleViewApplication}
              tableBodyRowClassName={`${styles.tableBodyItem} ${styles.application}`}
            />
          }
          customTableClasses={{
            tableContainerClassName: styles.tableWrap,
            tableHeaderClassName: `${styles.tableHeader} ${styles.application}`,
            tableHeaderItemClassName: styles.tableHeaderItem,
          }}
          emptyTable={{
            show: applications.length === 0,
            element: (
              <EmptyTable
                Vector={EmptyStreet}
                heading={"No applications found"}
                text=""
              />
            ),
          }}
        />
      )}
      <Pagination
        {...pagination}
        name={tab.value === "properties" ? "Listings" : "Applications"}
      />
    </>
  );
};

export { ListingsUI };
