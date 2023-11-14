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

const Property: PropertyTableItem = {
  propertyID: "123",
  propertyName: "New house",
  agent: "John Doe",
  status: "pending",
  date: "12/08/2023",
  amount: "NGN 200,000",
  isEdited: true,
};

interface PropertiesProps {
  handleView: (id: string) => void;
}

const PropertiesUI: React.FC<PropertiesProps> = ({ handleView }) => {
  return (
    <>
      <h1 className={styles.ttl}>
        Properties <span>(58)</span>
      </h1>
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
      <Table
        tableHeaderTitles={tableHeaderTitles}
        tableBody={
          <PropertyTable
            tableBodyItems={[
              ...new Array(4).fill(Property),
              ...new Array(4).fill({
                ...Property,
                isEdited: false,
                status: "approved",
              }),
              ...new Array(2).fill({
                ...Property,
                isEdited: false,
                status: "rejected",
              }),
            ]}
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
        currentPage={1}
        totalPages={3}
        handleChange={console.log}
        totalCount={21}
        pageLimit={10}
        name={"Properties"}
      />
    </>
  );
};

export { PropertiesUI };
