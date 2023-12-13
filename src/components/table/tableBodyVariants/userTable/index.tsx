import { ErrorIcon, EyeIconOutline, SendIcon, TickIcon } from "assets";
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
  resendMail: (email) => void;
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
  const actions = (id, status, email): ActionItem[] => {
    const viewItem = {
      text: (
        <>
          <EyeIconOutline className={styles.dropdownIcon} /> View
        </>
      ),
      action: () => view(id),
    };
    const resendItem = {
      text: (
        <>
          <SendIcon className={styles.dropdownIcon} /> Resend email
        </>
      ),
      action: () => resendMail(email),
    };

    const list = [viewItem];
    status === "unverified" && list.push(resendItem);
    return list;
  };

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
              <TableAction
                actions={actions(item.id, item.status, item.email)}
              />
            </span>
          </TableBodyRow>
        ))}
      </TableBody>
    </>
  );
};

export { UserTable };
