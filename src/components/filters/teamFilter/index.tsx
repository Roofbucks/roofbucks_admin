import { FilterIconOutline } from "assets";
import { useState } from "react";
import { TeamFilterModal } from "./filterModal";
import styles from "./styles.module.scss";
import { optionType } from "types";

interface TeamFilterProps {
  submit: ({ status, accountType }) => void;
  className?: string;
  role: optionType;
}

const TeamFilter: React.FC<TeamFilterProps> = ({
  className = "",
  role,
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
      <TeamFilterModal
        show={showModal}
        close={() => setModal(false)}
        submit={submit}
        role={role}
      />
    </>
  );
};

export { TeamFilter };
