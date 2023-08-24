import * as React from "react";
import { TableHeader, TableHeaderItemProps } from "./components";
import styles from "./styles.module.css";

// An interface for all custom table classes
interface AllCustomTableClasses {
  tableHeaderClassName?: string;
  tableHeaderItemClassName?: string;
  tableContainerClassName?: string;
  tableWrapperClass?: string;
}

//  Table Props
interface TableProps {
  tableHeaderTitles: TableHeaderItemProps[];
  tableBody: React.ReactElement;
  emptyTable?: {
    show: boolean;
    element: any;
  };
  customTableClasses?: AllCustomTableClasses;
  hideHeaders?: boolean;
}

/**
 * DASHBOARD TABLE COMPONENT
 * --------------------------------------------
 * This is the table component.
 */

const Table: React.FC<TableProps> = ({
  tableHeaderTitles,
  tableBody,
  emptyTable,
  hideHeaders,
  customTableClasses,
}) => {
  // All custom table classes
  const {
    tableHeaderClassName = "",
    tableHeaderItemClassName = "",
    tableContainerClassName = "",
    tableWrapperClass = "",
  } = customTableClasses || {};

  return (
    <section className={`${styles.tableWrapper} ${tableWrapperClass}`}>
      {!emptyTable?.show ? (
        <table
          className={`${styles.mainTableContainer} ${tableContainerClassName}`}
        >
          {!hideHeaders && (
            <TableHeader
              tableHeaderClassName={tableHeaderClassName}
              tableHeadItemClassName={tableHeaderItemClassName}
              tableHeaderTitles={tableHeaderTitles}
            />
          )}
          {tableBody}
        </table>
      ) : (
        <>{emptyTable.element}</>
      )}
    </section>
  );
};

export { Table };
export * from "./tableBodyVariants";
export * from "./components";
