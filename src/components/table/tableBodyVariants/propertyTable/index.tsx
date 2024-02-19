import { EditIcon, EyeIconOutline } from "assets";
import * as React from "react";
import { TableBody, TableBodyRow } from "../../components";
import styles from "./styles.module.scss";

// Test Table Body Item
export interface PropertyTableItem {
  propertyID: string;
  propertyName: string;
  agent: string;
  status: "pending" | "rejected" | "incomplete" | "approved";
  marketValue?: string;
  amount: string;
  date: string;
}

// Test Table Body Props
interface TableBodyProps {
  tableBodyItems: PropertyTableItem[];
  view: (id) => void;
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
}

const PropertyTable: React.FC<TableBodyProps> = ({
  tableBodyItems,
  view,
  tableBodyItemClassName,
  tableBodyRowClassName,
}) => {
  return (
    <>
      <TableBody customClassName={`${styles.tableBody}`}>
        {tableBodyItems.map((item, index) => (
          <TableBodyRow
            key={`body ${index}`}
            customClassName={`${styles.tableBodyRow} ${tableBodyRowClassName}`}
          >
            <span className={`${tableBodyItemClassName} ${styles.idWrap}`}>
              <p className={styles.propertyID}>{item.propertyID}</p>
            </span>
            <span className={tableBodyItemClassName}>
              <p className={styles.name}>{item.propertyName} </p>
            </span>
            <span className={tableBodyItemClassName}>
              <p className={styles.name}>{item.agent}</p>
            </span>
            <span className={tableBodyItemClassName}>{item.amount}</span>
            {item.marketValue ? (
              <span className={tableBodyItemClassName}>{item.marketValue}</span>
            ) : (
              ""
            )}
            <span className={tableBodyItemClassName}>{item.date}</span>
            <span className={tableBodyItemClassName}>
              <p className={`${styles.status} ${styles[item.status]}`}>
                {item.status}
              </p>
            </span>
            <span className={tableBodyItemClassName}>
              <EyeIconOutline
                role="button"
                onClick={() => view(item.propertyID)}
                className={styles.dropdownIcon}
              />
            </span>
          </TableBodyRow>
        ))}
      </TableBody>
    </>
  );
};

export { PropertyTable };
