import {
  ArrowRight,
  DocumentIcon,
  DownloadIcon,
  placeholderAvatar,
} from "assets";
import styles from "./styles.module.scss";
import { Button } from "components";
import { Link } from "react-router-dom";
import { Routes } from "router";

interface PropertyData {
  id: string;
  name: string;
  type: string;
  completionStatus: string;
  completionPercentage: string;
  completionPercent: string;
  yearBuilt: string;
  noOfBedrooms: string;
  noOfToilets: string;
  totalCost: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  indoorAmenities: string[];
  outdoorAmenities: string[];
  otherAmenities: string;
  erfSize: string;
  diningArea: string;
  floorSize: string;
  crossRoads: {
    address1: string;
    address2: string;
  };
  landmarks: {
    address1: string;
    address2: string;
  };
  media: string[];
  surveyPlan: string | undefined;
  purchaseReceipt: string | undefined;
  excision: string | undefined;
  gazette: string | undefined;
  deedOfAssignment: string | undefined;
  certificateOfOccupancy: string | undefined;
  otherDocs: { name: string; file: string }[];
}

interface PropertyProps {
  goBack: () => void;
  handleApprove: () => void;
  handleReject: () => void;
  handleMarketValue: () => void;
  handleRent: () => void;
}

const PropertyUI: React.FC<PropertyProps> = ({
  goBack,
  handleApprove,
  handleReject,
  handleMarketValue,
  handleRent,
}) => {
  return (
    <>
      <Button className={styles.backBtn} type="tertiary" onClick={goBack}>
        <ArrowRight />
        Back
      </Button>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Property Information</h1>
          <div>
            {/* Only show for approved property */}
            <Button
              className={styles.actionBtn}
              type="tertiary"
              onClick={handleRent}
            >
              Update rent
            </Button>
            {/* Only show for properties that have investors */}
            <Button
              className={styles.actionBtn}
              type="primary"
              onClick={handleMarketValue}
            >
              Update market value
            </Button>

            {/* Only show for pending property
            No modal need to approve edited property
            */}
            <Button
              className={styles.actionBtn}
              type="primary"
              onClick={handleApprove}
            >
              Approve
            </Button>

            {/* Only show for pending property */}
            <Button
              className={`${styles.actionBtn} ${styles.rejectBtn}`}
              type="secondary"
              onClick={handleReject}
            >
              Reject
            </Button>
          </div>
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
            <span>Property Type</span>
            <p>Bungalow</p>
          </div>
          <div>
            <span>Completion Status</span>
            <p>Completed</p>
          </div>
          <div>
            <span>Completion Percentage</span>
            <p>50%</p>
          </div>
          <div>
            <span>Completion Cost</span>
            <p>NGN 100,000,000</p>
          </div>
          <div>
            <span>Completion Date</span>
            <p>12/12/2023</p>
          </div>
          <div>
            <span>Year Built</span>
            <p>2022</p>
          </div>
          <div>
            <span>No. of Bedrooms</span>
            <p>10</p>
          </div>
          <div>
            <span>No. of Toilets</span>
            <p>15</p>
          </div>
          <div>
            <span>Total Cost</span>
            <p>NGN 500,000,000</p>
          </div>
          <div>
            <span>ERF Size</span>
            <p>123</p>
          </div>
          <div>
            <span>Dining Area</span>
            <p>123*123</p>
          </div>
          <div>
            <span>Floor Size</span>
            <p>500 * 500</p>
          </div>
        </div>
        <div className={styles.description}>
          <span>Description</span>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
            nesciunt iste, quam numquam minima repellendus molestias laboriosam
            aliquam eaque, error, iusto soluta modi accusantium porro odit
            natus! Quod, nihil ad!
          </p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Property Location</h1>
        </div>
        <div className={styles.section__content}>
          <div>
            <span>Address</span>
            <p>5 Murinla Road</p>
          </div>
          <div>
            <span>City</span>
            <p>Lagos</p>
          </div>
          <div>
            <span>State</span>
            <p>Lagos</p>
          </div>
          <div>
            <span>Zip Code</span>
            <p>123456</p>
          </div>
          <div>
            <span>Country</span>
            <p>Nigeria</p>
          </div>
          <div>
            <span>Crossroads</span>
            <p>kblbljrngjo, hbryfbr</p>
          </div>
          <div>
            <span>Landmarks</span>
            <p>bobfruiferl, ihbefbyerf</p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Amenities</h1>
        </div>
        <div className={styles.section__content}>
          <div>
            <p>Gym</p>
          </div>
          <div>
            <p>Indoor Pool</p>
          </div>
          <div>
            <p>Lounge</p>
          </div>
          <div>
            <p>Garden</p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Documents</h1>
        </div>
        <div className={styles.section__documents}>
          <div>
            <DocumentIcon />
            <p>Survey Plan</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
          <div>
            <DocumentIcon />
            <p>Purchase Receipt</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
          <div>
            <DocumentIcon />
            <p>Excision</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
          <div>
            <DocumentIcon />
            <p>Gazette</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
          <div>
            <DocumentIcon />
            <p>Deed of Assignment</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
          <div>
            <DocumentIcon />
            <p>Certificate of Occupancy</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
          <div>
            <DocumentIcon />
            <p>Doc 1</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
          <div>
            <DocumentIcon />
            <p>Doc 2</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
          <div>
            <DocumentIcon />
            <p>Doc 3</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Images</h1>
        </div>
        <div className={styles.section__images}>
          <div className={styles.section__images__main}>
            <img src={placeholderAvatar} alt="" />
          </div>
          <div className={styles.section__images__list}>
            <img role="button" src={placeholderAvatar} alt="" />
            <img role="button" src={placeholderAvatar} alt="" />
            <img role="button" src={placeholderAvatar} alt="" />
            <img role="button" src={placeholderAvatar} alt="" />
            <img role="button" src={placeholderAvatar} alt="" />
            <img role="button" src={placeholderAvatar} alt="" />
            <img role="button" src={placeholderAvatar} alt="" />
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Agent</h1>{" "}
          <Link
            target="_blank"
            className={styles.viewBtn}
            to={Routes.user("123")}
          >
            View user <ArrowRight />{" "}
          </Link>
        </div>
        <div className={styles.section__content}>
          <div>
            <span>First Name</span>
            <p>Murinla </p>
          </div>
          <div>
            <span>Last Name</span>
            <p>Abel</p>
          </div>
          <div>
            <span>Email</span>
            <p>abel@gmail.com</p>
          </div>
          <div>
            <span>Phone number</span>
            <p>08199228822</p>
          </div>
          <div>
            <span>Address</span>
            <p>25 Makoko Road</p>
          </div>
          <div>
            <span>City</span>
            <p>Lagos</p>
          </div>
          <div>
            <span>Country</span>
            <p>Nigeria</p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Home buyer - 75% ownership</h1>
          <Link
            target="_blank"
            className={styles.viewBtn}
            to={Routes.user("123")}
          >
            View user <ArrowRight />{" "}
          </Link>
        </div>
        <div className={styles.section__content}>
          <div>
            <span>First Name</span>
            <p>Murinla </p>
          </div>
          <div>
            <span>Last Name</span>
            <p>Abel</p>
          </div>
          <div>
            <span>Email</span>
            <p>abel@gmail.com</p>
          </div>
          <div>
            <span>Phone number</span>
            <p>08199228822</p>
          </div>
          <div>
            <span>Address</span>
            <p>25 Makoko Road</p>
          </div>
          <div>
            <span>City</span>
            <p>Lagos</p>
          </div>
          <div>
            <span>Country</span>
            <p>Nigeria</p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Investor (1) - 25% ownership</h1>{" "}
          <Link
            target="_blank"
            className={styles.viewBtn}
            to={Routes.user("123")}
          >
            View user <ArrowRight />{" "}
          </Link>
        </div>
        <div className={styles.section__content}>
          <div>
            <span>First Name</span>
            <p>Murinla </p>
          </div>
          <div>
            <span>Last Name</span>
            <p>Abel</p>
          </div>
          <div>
            <span>Email</span>
            <p>abel@gmail.com</p>
          </div>
          <div>
            <span>Phone number</span>
            <p>08199228822</p>
          </div>
          <div>
            <span>Address</span>
            <p>25 Makoko Road</p>
          </div>
          <div>
            <span>City</span>
            <p>Lagos</p>
          </div>
          <div>
            <span>Country</span>
            <p>Nigeria</p>
          </div>
        </div>
      </section>
    </>
  );
};

export { PropertyUI };
