import React from "react";
import styles from "../styles.module.css";

// Table header item
interface TableHeaderItemProps {
  title: string;
}

// Table header props
interface TableHeaderProps {
  tableHeaderTitles: TableHeaderItemProps[];
  tableHeadItemClassName?: string;
  tableHeaderClassName?: string;
  tableRowClassName?: string;
}

/**
 * This is a representation of the table header
 * ---------------------------------------------------
 * @param tableHeaderTitles - @interface TableHeaderProps
 *
 */

const TableHeader: React.FC<TableHeaderProps> = ({
  tableHeaderTitles,
  tableHeadItemClassName = "",
  tableHeaderClassName = "",
  tableRowClassName = "",
}) => {
  return (
    <thead className={`${styles.tableHeader} ${tableHeaderClassName}`}>
      <tr className={`${styles.tableRow} ${tableRowClassName}`}>
        {tableHeaderTitles.map((header, idx) => {
          return (
            <th className={tableHeadItemClassName} key={`${header}${idx + 1}`}>
              {header.title}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export { TableHeader };
export type { TableHeaderItemProps, TableHeaderProps };
