import { TrashIcon } from "assets";
import * as React from "react";
import { TableBody, TableBodyRow } from "../../components";
import styles from "./styles.module.scss";

// User Table Body Item
export interface TransactionTableItem {
  id: string;
  date: string;
  amount: string;
  type: "rent" | "deposit" | "investment" | "buy-back";
  property: string;
  propertyId: string;
  user: string;
}

// User Table Body Props
interface TableBodyProps {
  tableBodyItems: TransactionTableItem[];
  handleViewProperty: (id) => void;
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
}

const TransactionTable: React.FC<TableBodyProps> = ({
  tableBodyItems,
  tableBodyItemClassName,
  tableBodyRowClassName,
  handleViewProperty,
}) => {
  return (
    <>
      <TableBody customClassName={`${styles.tableBody}`}>
        {tableBodyItems.map((item, index) => (
          <TableBodyRow
            key={`body ${index}`}
            customClassName={`${styles.tableBodyRow} ${tableBodyRowClassName}`}
          >
            <span
              className={tableBodyItemClassName}
              role="button"
              onClick={handleViewProperty}
            >
              {item.property}
            </span>
            <span className={`${tableBodyItemClassName}`}>{item.amount}</span>
            <span className={tableBodyItemClassName}>{item.type}</span>
            <span className={tableBodyItemClassName}>{item.user}</span>
            <span className={tableBodyItemClassName}>{item.date}</span>
          </TableBodyRow>
        ))}
      </TableBody>
    </>
  );
};

export { TransactionTable };
