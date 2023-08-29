import { ErrorIcon, EyeIconOutline, TickIcon } from "assets";
import * as React from "react";
import {
  ActionItem,
  TableAction,
  TableBody,
  TableBodyRow,
} from "../../components";
import styles from "./styles.module.scss";

// Test Table Body Item
export interface UserTableItem {
  id: string;
  name: string;
  email: string;
  status: "verified" | "unverified" | "suspended";
  type: "agent" | "shareholder";
  dateCreated: string;
  verifiedBusiness?: boolean;
}

// Test Table Body Props
interface TableBodyProps {
  tableBodyItems: UserTableItem[];
  view: (id) => void;
  resendMail: (id) => void;
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
}

const UserTable: React.FC<TableBodyProps> = ({
  tableBodyItems,
  view,
  resendMail,
  tableBodyItemClassName,
  tableBodyRowClassName,
}) => {
  const actions = (id): ActionItem[] => [
    {
      text: (
        <>
          <EyeIconOutline className={styles.dropdownIcon} /> View
        </>
      ),
      action: () => view(id),
    },
    {
      text: (
        <>
          <EyeIconOutline className={styles.dropdownIcon} /> Resend email
        </>
      ),
      action: () => resendMail(id),
    },
  ];
  return (
    <>
      <TableBody customClassName={`${styles.tableBody}`}>
        {tableBodyItems.map((item, index) => (
          <TableBodyRow
            key={`body ${index}`}
            customClassName={`${styles.tableBodyRow} ${tableBodyRowClassName}`}
          >
            <span className={tableBodyItemClassName}>{item.name}</span>
            <span className={`${tableBodyItemClassName} ${styles.email}`}>{item.email}</span>
            <span className={`${tableBodyItemClassName} ${styles.account}`}>
              {item.type}{" "}
              {item.verifiedBusiness && item.type === "agent" ? (
                <TickIcon title="Verified business" />
              ) : item.type === "agent" ? (
                <ErrorIcon title="Unverified business" />
              ) : (
                ""
              )}{" "}
            </span>
            <span className={tableBodyItemClassName}>{item.dateCreated}</span>
            <span className={tableBodyItemClassName}>
              <p className={`${styles.status} ${styles[item.status]}`}>
                {item.status}
              </p>
            </span>
            <span className={tableBodyItemClassName}>
              <TableAction actions={actions(item.id)} />
            </span>
          </TableBodyRow>
        ))}
      </TableBody>
    </>
  );
};

export { UserTable };
