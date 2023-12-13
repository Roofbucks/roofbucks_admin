import { TrashIcon } from "assets";
import * as React from "react";
import { TableBody, TableBodyRow } from "../../components";
import styles from "./styles.module.scss";

// User Table Body Item
export interface TeamTableItem {
  id: string;
  name: string;
  email: string;
  dateAdded: string;
  role: string;
}

// User Table Body Props
interface TableBodyProps {
  tableBodyItems: TeamTableItem[];
  handleDelete: ({ id, email }) => void;
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
}

const TeamTable: React.FC<TableBodyProps> = ({
  tableBodyItems,
  tableBodyItemClassName,
  tableBodyRowClassName,
  handleDelete,
}) => {
  return (
    <>
      <TableBody customClassName={`${styles.tableBody}`}>
        {tableBodyItems.map((item, index) => (
          <TableBodyRow
            key={`body ${index}`}
            customClassName={`${styles.tableBodyRow} ${tableBodyRowClassName}`}
          >
            <span className={tableBodyItemClassName}>{item.name}</span>
            <span className={`${tableBodyItemClassName} ${styles.email}`}>
              {item.email}
            </span>
            <span className={tableBodyItemClassName}>{item.dateAdded}</span>
            <span className={tableBodyItemClassName}>
              <p className={`${styles.role} `}>{item.role}</p>
            </span>
            <span className={tableBodyItemClassName}>
              <TrashIcon
                onClick={() => handleDelete({ id: item.id, email: item.email })}
                role="button"
              />
            </span>
          </TableBodyRow>
        ))}
      </TableBody>
    </>
  );
};

export { TeamTable };
