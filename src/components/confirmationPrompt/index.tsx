import { Modal } from "components/modal";
import styles from "./styles.module.scss";
import { CloseIcon } from "assets";
import { Button } from "components";

interface ConfirmationModalProps {
  show: boolean;
  close: () => void;
  text: string;
  submit: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  close,
  text,
  submit,
}) => {
  return (
    <>
      <Modal
        contentClassName={styles.modal}
        position={"centered"}
        close={close}
        show={show}
      >
        <div className={styles.header}>
          <p>Confirm action</p>
          <CloseIcon role="button" onClick={close} />
        </div>
        <p className={styles.txt}>{text}</p>
        <div className={styles.footer}>
          <Button type="secondary" onClick={close}>
            Close
          </Button>
          <Button type="primary" onClick={submit}>
            Yes, continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { ConfirmationModal };
