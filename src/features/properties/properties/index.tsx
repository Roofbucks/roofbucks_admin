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
import { useState } from "react";
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

const Property: PropertyTableItem = {
  propertyID: "123",
  propertyName: "New house",
  agent: "John Doe",
  status: "pending",
  date: "12/08/2023",
  amount: "NGN 200,000",
};

interface PropertiesProps {
  handleView: (id: string) => void;
  properties: PropertyTableItem[];
  tab: {
    value: string;
    handleChange: (tab: string) => void;
  };
  count: {
    all: number;
    edited: number;
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
  status: optionType | undefined;
  date: { start; end } | undefined;
  handleFilter: ({
    status,
    date,
  }: {
    status: optionType;
    date: { start: string; end: string };
  }) => void;
}

const PropertiesUI: React.FC<PropertiesProps> = ({
  handleView,
  properties,
  tab,
  count,
  search,
  pagination,
  date,
  status,
  handleFilter,
}) => {
  const statusOptions: optionType[] = [
    {
      label: "Approved",
      value: "Approved",
    },
    {
      label: "Pending",
      value: "Pending",
    },
    {
      label: "Rejected",
      value: "Rejected",
    },
  ];

  return (
    <>
      <h1 className={styles.ttl}>Properties</h1>
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
          onClick={() => tab.handleChange("edited")}
          className={tab.value === "edited" ? styles.active : ""}
        >
          Edited Properties ({count.edited})
        </span>
      </section>
      <section className={styles.searchFilter}>
        {tab.value === "properties" ? (
          <PropertiesFilter
            statusOptions={statusOptions}
            submit={(data) => {
              handleFilter({
                status: data.status,
                date: { start: data.startDate, end: data.endDate },
              });
            }}
            value={{
              status: status ?? { label: "", value: "" },
              startDate: date ? date?.start : "",
              endDate: date ? date?.end : "",
            }}
          />
        ) : (
          ""
        )}
        <Search
          className={styles.search}
          value={search.value}
          placeholder={"Search by id or property"}
          handleChange={search.handleChange}
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
          show: properties.length === 0,
          element: (
            <EmptyTable
              Vector={EmptyStreet}
              heading={"No properties found"}
              text={""}
            />
          ),
        }}
      />
      <Pagination {...pagination} name={"Properties"} />
    </>
  );
};

export { PropertiesUI };
