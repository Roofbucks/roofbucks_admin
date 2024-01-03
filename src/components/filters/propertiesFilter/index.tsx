import { FilterIconOutline } from "assets";
import { useState } from "react";
import { PropertiesFilterModal, PropertiesFilterData } from "./filterModal";
import styles from "./styles.module.scss";

interface PropertiesFilterProps {
  submit: ({ status, startDate, endDate }) => void;
  className?: string;
  value: PropertiesFilterData;
}

const PropertiesFilter: React.FC<PropertiesFilterProps> = ({
  className = "",
  value,
  submit,
}) => {
  const [showModal, setModal] = useState(false);

  let count = 0;
  if (value.status && value.status?.value !== "") count++;
  if (value.startDate && value.startDate !== "") count++;
  if (value.endDate && value.endDate !== "") count++;

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
      <PropertiesFilterModal
        show={showModal}
        close={() => setModal(false)}
        submit={submit}
        value={value}
      />
    </>
  );
};

export { PropertiesFilter };
