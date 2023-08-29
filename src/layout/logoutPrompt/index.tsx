import styles from "./styles.module.css";
import * as React from "react";
import { LogoutIcon } from "assets";
import { Button, Modal } from "components";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { Preloader } from "components";

interface PromptProps {
  show: boolean;
  closeModal: () => void;
}

const Logout: React.FC<PromptProps> = ({ show, closeModal }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.clear();
      setLoading(false);
      navigate(Routes.home);
    }, 1000);
  };

  return (
    <>
      <Preloader loading={loading} />
      <Modal
        contentClassName={styles.logout}
        show={show}
        close={closeModal}
        position="centered"
      >
        <LogoutIcon className={styles.img} />
        <p className={styles.txt}>Are you sure you want to logout?</p>
        <div className={styles.btnsec}>
          <Button type="primary" className={styles.btn1} onClick={closeModal}>
            No
          </Button>
          <Button type="primary" className={styles.btn2} onClick={logout}>
            Yes
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { Logout };
