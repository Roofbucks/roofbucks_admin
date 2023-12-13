import { FilterIconOutline } from "assets";
import { useState } from "react";
import { TeamFilterModal } from "./filterModal";
import styles from "./styles.module.scss";
import { optionType } from "types";

interface TeamFilterProps {
  submit: (role: string) => void;
  className?: string;
  role: optionType | undefined;
}

const TeamFilter: React.FC<TeamFilterProps> = ({
  className = "",
  role,
  submit,
}) => {
  const [showModal, setModal] = useState(false);

  return (
    <>
      <div className={styles.filterWrap}>
        {role ? <p>1</p> : ""}
        <FilterIconOutline
          role="button"
          className={styles.filter}
          onClick={() => setModal(true)}
        />
      </div>
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
