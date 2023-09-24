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

  return (
    <>
      <FilterIconOutline
        className={styles.filter}
        onClick={() => setModal(true)}
      />
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
