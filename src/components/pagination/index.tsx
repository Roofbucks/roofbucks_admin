import * as React from "react";
import styles from "./styles.module.css";
import { ChevronIcon } from "assets";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleChange: (x: number) => void;
  totalCount: number;
  pageLimit: number;
  hide?: boolean;
  name: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  totalPages,
  handleChange,
  pageLimit,
  hide,
  name,
}) => {
  const onChange = (e) => handleChange(e.target.value);

  const handleIncrease = () => {
    if (currentPage < totalPages) handleChange(currentPage + 1);
  };

  const handleDecrease = () => {
    if (currentPage > 1) handleChange(currentPage - 1);
  };

  if (hide) return null;

  const start = currentPage * pageLimit - pageLimit + 1;
  const end =
    currentPage * pageLimit > totalCount ? totalCount : currentPage * pageLimit;

  return (
    <section className={styles.pagination}>
      <p>
        {start} - {end} of {totalCount} {name}
      </p>
      <div className={styles.inputBox}>
        <input
          onChange={onChange}
          value={currentPage}
          className={styles.input}
          type="number"
          max={totalPages}
          min={1}
          disabled={currentPage >= totalPages || currentPage <= 1}
        />
        <span>
          <ChevronIcon
            onClick={handleIncrease}
            role="button"
            className={`${styles.up} ${
              currentPage >= totalPages ? styles.disabled : ""
            }`}
          />
          <ChevronIcon
            onClick={handleDecrease}
            role="button"
            className={`${styles.down} ${
              currentPage <= 1 ? styles.disabled : ""
            }`}
          />
        </span>
      </div>
    </section>
  );
};

export { Pagination };
