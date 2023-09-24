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
  MarketplaceApplicationTable, MarketplaceApplicationTableItem
} from "components";
import { useState } from "react";

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
  { title: "Focus" },
  { title: "Date" },
  { title: "" },
];

const Properties: PropertyTableItem = {
  propertyID: "123",
  propertyName: "New house",
  agent: "John Doe",
  status: "pending",
  date: "12/08/2023",
  amount: "NGN 200,000",
};

const application: MarketplaceApplicationTableItem = {
  id: "123",
  property: "Munriola Park",
  propertyID: "1ebthbb1241",
  agent: "John Doe",
  name: "marilyn Monroe",
  email: "marilymonroe@gmail.com",
  location: "Lagos, Nigeria",
  focus: "Cashflow",
  date: "12/12/2023",
};

interface PropertiesProps {
  handleViewProperty: (id: string) => void;
  handleViewApplication: (id: string) => void;
}

const MarketplaceUI: React.FC<PropertiesProps> = ({
  handleViewProperty,
  handleViewApplication,
}) => {
  const [tab, setTab] = useState("properties");
  return (
    <>
      <h1 className={styles.ttl}>Marketplace</h1>
      <section className={styles.tabs}>
        <span
          role="button"
          onClick={() => setTab("properties")}
          className={tab === "properties" ? styles.active : ""}
        >
          Properties (45)
        </span>
        <span
          role="button"
          onClick={() => setTab("applications")}
          className={tab === "applications" ? styles.active : ""}
        >
          Applications (15)
        </span>
      </section>
      <section className={styles.searchFilter}>
        <PropertiesFilter
          submit={console.log}
          value={{
            status: { label: "", value: "" },
            startDate: "",
            endDate: "",
          }}
        />
        <Search
          className={styles.search}
          value={""}
          placeholder={"Search by id, property or agent"}
          handleChange={console.log}
        />
      </section>
      {tab === "properties" ? (
        <Table
          tableHeaderTitles={tableHeaderTitles}
          tableBody={
            <PropertyTable
              tableBodyItems={new Array(10).fill(Properties)}
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
      ) : (
        <Table
          tableHeaderTitles={applicationTableHeaderTitles}
          tableBody={
            <MarketplaceApplicationTable
              tableBodyItems={new Array(10).fill(application)}
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
      )}
      <Pagination
        currentPage={1}
        totalPages={3}
        handleChange={console.log}
        totalCount={21}
        pageLimit={10}
        name={"Listings"}
      />
    </>
  );
};

export { MarketplaceUI };
