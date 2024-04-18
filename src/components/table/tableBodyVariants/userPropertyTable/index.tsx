import { EyeIconOutline } from "assets";
import * as React from "react";
import { TableBody, TableBodyRow } from "../../components";
import styles from "./styles.module.scss";

// Test Table Body Item
export interface UserPropertyTableItem {
  propertyID: string;
  propertyName: string;
  status: string;
  marketValue: string;
  amount: string;
  date: string;
  percentOwned?: number;
}

// Test Table Body Props
interface TableBodyProps {
  tableBodyItems: UserPropertyTableItem[];
  view: (id) => void;
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
  isShareholder?: boolean;
}

const UserPropertyTable: React.FC<TableBodyProps> = ({
  tableBodyItems,
  view,
  tableBodyItemClassName,
  tableBodyRowClassName,
  isShareholder,
}) => {
  return (
    <>
      <TableBody customClassName={`${styles.tableBody}`}>
        {tableBodyItems.map((item, index) => (
          <TableBodyRow
            key={`body ${index}`}
            customClassName={`${styles.tableBodyRow} ${tableBodyRowClassName}`}
          >
            <span className={tableBodyItemClassName}>
              <p className={styles.propertyID}>{item.propertyID}</p>
            </span>
            <span className={tableBodyItemClassName}>
              <p className={styles.name}>{item.propertyName}</p>
            </span>
            <span className={tableBodyItemClassName}>{item.amount}</span>
            <span className={tableBodyItemClassName}>{item.marketValue}</span>
            <span className={tableBodyItemClassName}>{item.date}</span>
            {isShareholder ? (
              <span className={tableBodyItemClassName}>
                {item.percentOwned}%
              </span>
            ) : (
              <span className={tableBodyItemClassName}>
                <p className={`${styles.status} ${styles[item.status]}`}>
                  {item.status}
                </p>
              </span>
            )}
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

export { UserPropertyTable };
