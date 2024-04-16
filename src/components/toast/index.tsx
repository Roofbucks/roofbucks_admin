import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { CloseIcon } from "assets";

interface ToastProps {
  loading: boolean;
  head: string;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ loading, message, head, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (loading) {
      setVisible(true);
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [loading, onClose]);

  if (!visible) return null;

  return (
    <>
      {loading && (
        <div className={styles.toastContainer}>
          <div className={styles.toast}>
            <section className={styles.body}>
              <p className={styles.head}>{head}</p>
              <p className={styles.message}>{message}</p>
            </section>
              <CloseIcon onClick={onClose} className={styles.closeIcon} />
          </div>
        </div>
      )}
    </>
  );
};

export { Toast };
