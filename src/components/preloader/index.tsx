import * as React from "react";
import styles from "./styles.module.css";

interface PreloaderProps {
  loading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ loading }) => {
  return (
    <>
      {loading ? (
        <div data-testid="preloader" className={styles.preloader}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export { Preloader };
