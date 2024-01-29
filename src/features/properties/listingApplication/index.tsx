import { Button, Modal } from "components";
import styles from "./styles.module.scss";
import { ArrowRight, CloseIcon } from "assets";
import { Link } from "react-router-dom";
import { Routes } from "router";

export interface ListingApplicationData {
  property: {
    id: string;
    name: string;
    agent: string;
    cost: number;
    completionStatus: string;
  };
  applicant: {
    id: string;
    name: string;
    email: string;
    socialMedia: string;
    location: string;
    reason: string;
    percentage: number;
    amount: number;
  };
}

interface ListingApplicationUIProps {
  discard: () => void;
  show: boolean;
  close: () => void;
  application: ListingApplicationData;
}

const ListingApplicationUI: React.FC<ListingApplicationUIProps> = ({
  show,
  close,
  discard,
  application,
}) => {
  const { property, applicant } = application;
  return (
    <>
      <Modal
        contentClassName={styles.modal}
        position="centered"
        show={show}
        close={() => {}}
      >
        <CloseIcon onClick={close} role="button" className={styles.closeBtn} />
        <h1 className={styles.ttl}>Listing Application</h1>
        {/* <p className={styles.id}>ID: 12344</p> */}
        <section className={styles.section}>
          <div className={styles.section__heading}>
            <h2 className={styles.section__ttl}>Property Information</h2>
            <Link
              className={styles.viewBtn}
              target="_blank"
              to={Routes.property(property.id)}
              type="tertiary"
            >
              View property <ArrowRight />
            </Link>
          </div>
          <div className={styles.section__content}>
            <div>
              <span>Property ID</span>
              <p>{property.id}</p>
            </div>
            <div>
              <span>Property Name</span>
              <p>{property.name}</p>
            </div>
            <div>
              <span>Agent Name</span>
              <p>{property.agent}</p>
            </div>
            <div>
              <span>Completion Status</span>
              <p>{property.completionStatus}</p>
            </div>
            <div>
              <span>Total Cost</span>
              <p>NGN {property.cost}</p>
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
              <p>{applicant.name} </p>
              <a href={applicant.socialMedia} target="_blank">
                Social media
              </a>
            </div>
            <div>
              <span>Email</span>
              <a href={`mailto:${applicant.email}`}>{applicant.email}</a>
            </div>
            <div>
              <span>Location</span>
              <p>{applicant.location}</p>
            </div>
            <div>
              <span>Reason</span>
              <p>{applicant.reason}</p>
            </div>
            <div>
              <span>Percentage</span>
              <p>{applicant.percentage}%</p>
            </div>
            <div>
              <span>Amount</span>
              <p>NGN {applicant.amount}</p>
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
export { ListingApplicationUI };
