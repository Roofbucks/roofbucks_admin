import { TrashIcon } from "assets";
import * as React from "react";
import { TableBody, TableBodyRow } from "../../components";
import styles from "./styles.module.scss";
import { Button } from "components/button";

// User Table Body Item
export interface TransactionTableItem {
  id: string;
  date: string;
  amount: string;
  type:
    | "rent"
    | "deposit"
    | "investment"
    | "buy-back"
    | "rent-payout"
    | "deposit-payout"
    | "buy-back-payout";
  property: string;
  propertyId: string;
  user: string;
  status: "pending" | "success" | "failed" | "processing";
}

// User Table Body Props
interface TableBodyProps {
  tableBodyItems: TransactionTableItem[];
  handleViewProperty: (id) => void;
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
  handlePayAgent: (id) => void;
}

const TransactionTable: React.FC<TableBodyProps> = ({
  tableBodyItems,
  tableBodyItemClassName,
  tableBodyRowClassName,
  handleViewProperty,
  handlePayAgent,
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
              onClick={() => handleViewProperty(item.propertyId)}
            >
              {item.property}
            </span>
            <span className={`${tableBodyItemClassName}`}>{item.amount}</span>
            <span className={tableBodyItemClassName}>
              {item.type.replaceAll("-", " ")}
            </span>
            <span className={tableBodyItemClassName}>{item.user}</span>
            <span
              className={`${tableBodyItemClassName} ${styles[item.status]}`}
            >
              {item.status}
            </span>
            <span className={tableBodyItemClassName}>{item.date}</span>
            <span>
              {item.type === "deposit-payout" && item.status === "pending" ? (
                <Button
                  className={styles.payBtn}
                  onClick={() => handlePayAgent(item.id)}
                  type="tertiary"
                >
                  Pay agent
                </Button>
              ) : (
                ""
              )}
            </span>
          </TableBodyRow>
        ))}
      </TableBody>
    </>
  );
};

export { TransactionTable };
