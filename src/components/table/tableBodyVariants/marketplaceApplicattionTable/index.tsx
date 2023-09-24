import { EyeIconOutline } from "assets";
import * as React from "react";
import { TableBody, TableBodyRow } from "../../components";
import styles from "./styles.module.css";

// Marketplace Application Table Body Item
export interface MarketplaceApplicationTableItem {
  id: string;
  property: string;
  agent: string;
  propertyID: string;
  name: string;
  email: string;
  location: string;
  focus: string;
  date: string;
}

// Marketplace Application Table Body Props
interface TableBodyProps {
  tableBodyItems: MarketplaceApplicationTableItem[];
  view: (id) => void;
  tableBodyItemClassName?: string;
  tableBodyRowClassName?: string;
}

const MarketplaceApplicationTable: React.FC<TableBodyProps> = ({
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
            <span className={tableBodyItemClassName}>
              <p className={styles.property}> {item.property}</p>
              <p className={styles.agent} >{item.agent}</p>
            </span>
            <span className={tableBodyItemClassName}>
              <p>{item.name}</p>
              <a className={styles.email} href={`mailto:${item.email}`}>{item.email}</a>
            </span>
            <span className={tableBodyItemClassName}>{item.location}</span>
            <span className={tableBodyItemClassName}>{item.focus}</span>
            <span className={tableBodyItemClassName}>{item.date}</span>
            <span className={tableBodyItemClassName}>
              <EyeIconOutline
                role="button"
                onClick={() => view(item.id)}
                className={styles.dropdownIcon}
              />
            </span>
          </TableBodyRow>
        ))}
      </TableBody>
    </>
  );
};

export { MarketplaceApplicationTable };
