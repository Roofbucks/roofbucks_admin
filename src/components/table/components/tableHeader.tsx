import React from "react";
import styles from "../styles.module.scss";

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
    <section className={`${styles.tableHeader} ${tableHeaderClassName}`}>
      {tableHeaderTitles.map((header, idx) => {
        return (
          <span className={tableHeadItemClassName} key={`${header}${idx + 1}`}>
            {header.title}
          </span>
        );
      })}
    </section>
  );
};

export { TableHeader };
export type { TableHeaderItemProps, TableHeaderProps };
