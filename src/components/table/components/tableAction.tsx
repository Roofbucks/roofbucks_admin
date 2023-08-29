import { Dropdown, DropdownListItem } from "components";
import React from "react";
import styles from "../styles.module.scss";

/**
 * This is a representation of the table's action dropdown component
 * ---------------------------------------------------
 * @param customClassName - @interface TableBodyProps
 *
 */

export interface ActionItem {
  text: any;
  action: () => void;
}
interface TableActionProps {
  actions: ActionItem[];
}
const TableAction: React.FC<TableActionProps> = ({ actions }) => {
  return (
    <Dropdown
      dropdownListClassName={styles.dropdownList}
      type="action"
      caretColor="black"
      className={styles.dropdown}
    >
      {actions.map((item2, index) => (
        <DropdownListItem
          onDropdownChange={() => item2.action()}
          key={index}
          className={styles.dropdownListItem}
        >
          {item2.text}
        </DropdownListItem>
      ))}
    </Dropdown>
  );
};

export { TableAction };
