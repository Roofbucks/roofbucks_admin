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

  let count = 0;
  if (value.status.value) count++;
  if (value.type.value) count++;
  if (value.startDate && value.endDate) count++;

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
