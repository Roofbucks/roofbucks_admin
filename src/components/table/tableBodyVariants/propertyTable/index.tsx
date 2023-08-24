import { EditIcon, EyeIconOutline } from "assets";
import * as React from "react";
import { ActionItem, TableAction, TableBody } from "../../components";
import styles from "./styles.module.css";

// Test Table Body Item
export interface PropertyTableItem {
  propertyID: string;
  propertyName: string;
  status: string;
  amount: string;
  date: string;
}

// Test Table Body Props
interface TableBodyProps {
  tableBodyItems: PropertyTableItem[];
  edit: (id) => void;
  view: (id) => void;
  promote: (id) => void;
  tableBodyItemClassName: string;
}

const PropertyTable: React.FC<TableBodyProps> = ({
  tableBodyItems,
  edit,
  view,
  promote,
  tableBodyItemClassName,
}) => {
  const actions = (id): ActionItem[] => [
    {
      text: (
        <>
          <EditIcon className={styles.dropdownIcon} /> Edit
        </>
      ),
      action: () => edit(id),
    },
    {
      text: (
        <>
          <EyeIconOutline className={styles.dropdownIcon} /> View
        </>
      ),
      action: () => view(id),
    },
  ];
  return (
    <>
      <TableBody customClassName={`${styles.tableBody}`}>
        {tableBodyItems.map((item, index) => (
          <tr key={`body ${index}`}>
            <td className={tableBodyItemClassName}>
              <p className={styles.propertyID}>{item.propertyID}</p>
            </td>
            <td className={tableBodyItemClassName}>
              <p className={styles.name}>{item.propertyName}</p>
            </td>
            <td className={tableBodyItemClassName}>{item.date}</td>
            <td className={tableBodyItemClassName}>$ {item.amount}</td>
            <td className={tableBodyItemClassName}>
              <p className={`${styles.status} ${styles[item.status]}`}>
                {item.status}
              </p>
            </td>
            <td className={tableBodyItemClassName}>
              <TableAction actions={actions(item.propertyID)} />
            </td>
          </tr>
        ))}
      </TableBody>
    </>
  );
};

export { PropertyTable };
