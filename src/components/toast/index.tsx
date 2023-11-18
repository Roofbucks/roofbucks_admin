import { CloseIcon, CheckIcon } from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import { Modal } from "components/modal";

export interface ToastData {
  text: string;
  show: boolean;
  type: boolean;
}

export interface ToastProps extends ToastData {
  close: () => void;
}

const Toast: React.FC<ToastProps> = ({ text, close, show, type }) => {
  return (
    <>
      <Modal
        contentClassName={`${styles.toast} ${!type ? styles.toastRed : ""}`}
        show={show}
        close={close}
        position="right"
      >
        {type ? (
          <CheckIcon className={styles.icon} />
        ) : (
          <CloseIcon className={styles.icon} />
        )}
        <div>
          <p className={styles.txt}>{text}</p>
        </div>
      </Modal>
    </>
  );
};

export { Toast };
