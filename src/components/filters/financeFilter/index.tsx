import { FilterIconOutline } from "assets";
import { useState } from "react";
import { FinanceFilterData, FinanceFilterModal } from "./filterModal";
import styles from "./styles.module.scss";
import { optionType } from "types";

interface FinanceFilterProps {
  submit: ({ status, startDate, endDate, type }) => void;
  className?: string;
  value: FinanceFilterData;
}

const FinanceFilter: React.FC<FinanceFilterProps> = ({
  className = "",
  submit,
  value,
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
        value={value}
      />
    </>
  );
};

export { FinanceFilter };
