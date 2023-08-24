import React from "react";
import styles from "../styles.module.css";

// Table body props
interface TableBodyProps {
  customClassName?: string;
  children: any;
}

/**
 * This is a representation of HTML's tbody component
 * ---------------------------------------------------
 * @param customClassName - @interface TableBodyProps
 *
 */

const TableBody: React.FC<TableBodyProps> = ({ children, customClassName = "" }) => {
  return <tbody className={`${styles.tableBody} ${customClassName}`}>{children}</tbody>;
};

export { TableBody };
