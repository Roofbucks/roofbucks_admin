import { FilterIconOutline } from "assets";
import { useState } from "react";
import { UsersFilterModal } from "./filterModal";
import styles from "./styles.module.scss";
import { optionType } from "types";

interface UsersFilterProps {
  submit: (data) => void;
  className?: string;
  status: optionType | undefined;
  accountType: optionType | undefined;
}

const UsersFilter: React.FC<UsersFilterProps> = ({
  className = "",
  status,
  accountType,
  submit,
}) => {
  const [showModal, setModal] = useState(false);

  let count = 0;
  if (status && status?.value !== "") count++;
  if (accountType && accountType?.value !== "") count++;

  return (
    <>
      <div className={styles.filterWrap}>
        {count > 0 ? <p>{count}</p> : ""}
        <FilterIconOutline
          role="button"
          className={styles.filter}
          onClick={() => setModal(true)}
        />
      </div>
      <UsersFilterModal
        show={showModal}
        close={() => setModal(false)}
        submit={submit}
        accountType={accountType}
        status={status}
      />
    </>
  );
};

export { UsersFilter };
