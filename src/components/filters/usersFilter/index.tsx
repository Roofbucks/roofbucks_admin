import { FilterIconOutline } from "assets";
import { useState } from "react";
import { UsersFilterModal, UsersFilterData } from "./filterModal";
import styles from "./styles.module.scss";

interface UsersFilterProps {
  submit: ({ status, accountType }) => void;
  className?: string;
  value: UsersFilterData;
}

const UsersFilter: React.FC<UsersFilterProps> = ({
  className = "",
  value,
  submit,
}) => {
  const [showModal, setModal] = useState(false);

  return (
    <>
      <FilterIconOutline
        className={styles.filter}
        onClick={() => setModal(true)}
      />
      <UsersFilterModal
        show={showModal}
        close={() => setModal(false)}
        submit={submit}
        value={value}
      />
    </>
  );
};

export { UsersFilter };
