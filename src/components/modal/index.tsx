import { useClickOutside } from "hooks";
import styles from "./styles.module.scss";
import { useRef } from "react";

interface ModalProps {
  children: any;
  position?: "centered" | "left" | "right";
  close: () => void;
  show: boolean;
  dialogClassName?: string;
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  position = "centered",
  close,
  show,
  dialogClassName,
  contentClassName,
}) => {
  const modalRef = useRef(null);
  useClickOutside(modalRef, close);

  if (!show) return null;

  return (
    <>
      <aside className={`${styles.modalDialog} ${dialogClassName}`}>
        <section
          ref={modalRef}
          className={`${styles.modalContent} ${styles[position]} ${contentClassName}`}
        >
          {children}
        </section>
      </aside>
    </>
  );
};

export { Modal };
