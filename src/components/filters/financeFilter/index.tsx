import { FilterIconOutline } from "assets";
import { useState } from "react";
import { FinanceFilterModal } from "./filterModal";
import styles from "./styles.module.scss";
import { optionType } from "types";

interface FinanceFilterProps {
  submit: ({ status, accountType }) => void;
  className?: string;
  type: optionType;
}

const FinanceFilter: React.FC<FinanceFilterProps> = ({
  className = "",
  type,
  submit,
}) => {
  const [showModal, setModal] = useState(false);

  return (
    <>
      <FilterIconOutline
        role="button"
        className={styles.filter}
        onClick={() => setModal(true)}
      />
      <FinanceFilterModal
        show={showModal}
        close={() => setModal(false)}
        submit={submit}
        type={type}
      />
    </>
  );
};

export { FinanceFilter };
