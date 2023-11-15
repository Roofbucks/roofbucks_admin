import { Button, Modal } from "components";
import styles from "./styles.module.scss";
import { ArrowRight, CloseIcon } from "assets";
import { Link } from "react-router-dom";
import { Routes } from "router";

interface MarketplaceApplicationUIProps {
  discard: () => void;
  show: boolean;
  close: () => void;
}

const MarketplaceApplicationUI: React.FC<MarketplaceApplicationUIProps> = ({
  show,
  close,
  discard,
}) => {
  return (
    <>
      <Modal
        contentClassName={styles.modal}
        position="centered"
        show={show}
        close={close}
      >
        <CloseIcon onClick={close} role="button" className={styles.closeBtn} />
        <h1 className={styles.ttl}>Marketplace Application</h1>
        <p className={styles.id}>ID: 12344</p>
        <section className={styles.section}>
          <div className={styles.section__heading}>
            <h2 className={styles.section__ttl}>Property Information</h2>
            <Link
              className={styles.viewBtn}
              target="_blank"
              to={Routes.property("123")}
              type="tertiary"
            >
              View property <ArrowRight />
            </Link>
          </div>
          <div className={styles.section__content}>
            <div>
              <span>Property ID</span>
              <p>12345678</p>
            </div>
            <div>
              <span>Property Name</span>
              <p>Mukola House</p>
            </div>
            <div>
              <span>Agent Name</span>
              <p>John Musaw</p>
            </div>
            <div>
              <span>Completion Status</span>
              <p>Completed</p>
            </div>
            <div>
              <span>Total Cost</span>
              <p>NGN 500,000,000</p>
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.section__heading}>
            <h2 className={styles.section__ttl}>Applicant Information</h2>
          </div>
          <div className={styles.section__content}>
            <div>
              <span>Name</span>
              <p>Mukola Tones </p>
              <a href="">Social media</a>
            </div>
            <div>
              <span>Email</span>
              <a>mukolatones@gmail.com</a>
            </div>
            <div>
              <span>Location</span>
              <p>Laagos, Nigeria</p>
            </div>
            <div>
              <span>Timeline</span>
              <p>hthrhtt</p>
            </div>
            <div>
              <span>Focus</span>
              <p>hthrhtt</p>
            </div>
            <div>
              <span>ROI</span>
              <p>12%</p>
            </div>
            <div>
              <span>Investing As:</span>
              <p>Individual</p>
            </div>
            <div>
              <span>Long Term Ownership</span>
              <p>10</p>
            </div>
            <div>
              <span>Website</span>
              <a>https://website.com</a>
            </div>
          </div>
        </section>
        <section className={styles.btns}>
          <Button type={"secondary"} onClick={discard}>
            Discard
          </Button>
        </section>
      </Modal>
    </>
  );
};
export { MarketplaceApplicationUI };