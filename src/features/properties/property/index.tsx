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
import { useEffect, useState } from "react";

export interface PropertyData {
  status: string;
  id: string;
  name: string;
  type: string;
  completionStatus: string;
  completionPercentage: string;
  completionCost: string;
  completionDate: string;
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
  amenities: string[];
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
  agent: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    id: string;
  };
  homeBuyer:
    | {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        country: string;
        id: string;
        percentage: number;
      }
    | undefined;
  investors: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    id: string;
    percentage: number;
  }[];
  rent: number;
  marketValue: number;
}

interface PropertyProps {
  goBack: () => void;
  handleApprove: () => void;
  handleReject: () => void;
  handleMarketValue: () => void;
  handleRent: () => void;
  handleSuspend: () => void;
  handleUnsuspend: () => void;
  property: PropertyData;
}

const PropertyUI: React.FC<PropertyProps> = ({
  goBack,
  handleApprove,
  handleReject,
  handleMarketValue,
  handleRent,
  property,
  handleUnsuspend,
  handleSuspend,
}) => {
  const { agent, homeBuyer, investors } = property;

  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(property.media[0]);
  }, [property]);

  return (
    <>
      <Button className={styles.backBtn} type="tertiary" onClick={goBack}>
        <ArrowRight />
        Back
      </Button>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>
            Property Information{" "}
            <span
              className={`${styles.section__status} ${
                styles[`section__status--${property.status}`]
              }`}
            >
              {property.status}
            </span>
          </h1>
          <div className={styles.btnSec}>
            {/* Only show for approved property */}
            {property.status !== "rejected" ? (
              <Button
                className={styles.actionBtn}
                type="tertiary"
                onClick={handleRent}
              >
                Update rent
              </Button>
            ) : (
              ""
            )}
            {/* Only show for properties that have investors */}
            {property.status !== "rejected" ? (
              <Button
                className={styles.actionBtn}
                type="primary"
                onClick={handleMarketValue}
              >
                Update market value
              </Button>
            ) : (
              ""
            )}
            {property.status === "approved" ? (
              <Button
                className={`${styles.actionBtn} ${styles.rejectBtn}`}
                type="secondary"
                onClick={handleSuspend}
              >
                Suspend property
              </Button>
            ) : (
              ""
            )}

            {property.status === "suspended" ? (
              <Button
                className={`${styles.actionBtn} ${styles.rejectBtn}`}
                type="secondary"
                onClick={handleUnsuspend}
              >
                Unsuspend property
              </Button>
            ) : (
              ""
            )}

            {/* Only show for pending property */}
            {property.status === "pending" ? (
              <>
                <Button
                  className={styles.actionBtn}
                  type="primary"
                  onClick={handleApprove}
                >
                  Approve
                </Button>
                <Button
                  className={`${styles.actionBtn} ${styles.rejectBtn}`}
                  type="secondary"
                  onClick={handleReject}
                >
                  Reject
                </Button>
              </>
            ) : (
              ""
            )}
          </div>
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
            <span>Property Type</span>
            <p>{property.type}</p>
          </div>
          <div>
            <span>Completion Status</span>
            <p>{property.completionStatus}</p>
          </div>
          {property.completionStatus === "in-progress" ? (
            <>
              <div>
                <span>Completion Percentage</span>
                <p>{property.completionPercentage}%</p>
              </div>
              <div>
                <span>Completion Cost</span>
                <p>{property.completionCost}</p>
              </div>
              <div>
                <span>Completion Date</span>
                <p>{property.completionDate}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <span>Year Built</span>
                <p>{property.yearBuilt}</p>
              </div>
              <div>
                <span>No. of Bedrooms</span>
                <p>{property.noOfBedrooms}</p>
              </div>
              <div>
                <span>No. of Toilets</span>
                <p>{property.noOfToilets}</p>
              </div>
            </>
          )}
          <div>
            <span>Total Cost</span>
            <p>{property.totalCost.toLocaleString()}</p>
          </div>
          <div>
            <span>ERF Size</span>
            <p>{property.erfSize}</p>
          </div>
          <div>
            <span>Dining Area</span>
            <p>{property.diningArea}</p>
          </div>
          <div>
            <span>Floor Size</span>
            <p>{property.floorSize}</p>
          </div>
          <div>
            <span>Market value</span>
            <p>NGN {property.marketValue.toLocaleString()}</p>
          </div>
          <div>
            <span>Annual rent</span>
            <p>NGN {property.rent.toLocaleString()}</p>
          </div>
        </div>
        <div className={styles.description}>
          <span>Description</span>
          <p>{property.description}</p>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Property Location</h1>
        </div>
        <div className={styles.section__content}>
          <div>
            <span>Address</span>
            <p>{property.address}</p>
          </div>
          <div>
            <span>City</span>
            <p>{property.city}</p>
          </div>
          <div>
            <span>State</span>
            <p>{property.state}</p>
          </div>
          <div>
            <span>Zip Code</span>
            <p>{property.zipCode}</p>
          </div>
          <div>
            <span>Country</span>
            <p>{property.country}</p>
          </div>
          <div>
            <span>Crossroads</span>
            <p>
              {property.crossRoads.address1}, {property.crossRoads.address2}
            </p>
          </div>
          <div>
            <span>Landmarks</span>
            <p>
              {property.landmarks.address1}, {property.landmarks.address2}
            </p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Amenities</h1>
        </div>
        <div className={styles.section__content}>
          {property.amenities.map((item) => (
            <div>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Documents</h1>
        </div>
        <div className={styles.section__documents}>
          {property.surveyPlan ? (
            <div>
              <DocumentIcon />
              <p>Survey Plan</p>
              <a href={property.surveyPlan} target="_blank">
                <DownloadIcon />
              </a>
            </div>
          ) : (
            ""
          )}
          {property.purchaseReceipt ? (
            <div>
              <DocumentIcon />
              <p>Purchase Receipt</p>
              <a href={property.purchaseReceipt} target="_blank">
                <DownloadIcon />
              </a>
            </div>
          ) : (
            ""
          )}
          {property.excision ? (
            <div>
              <DocumentIcon />
              <p>Excision</p>
              <a href={property.excision} target="_blank">
                <DownloadIcon />
              </a>
            </div>
          ) : (
            ""
          )}
          {property.gazette ? (
            <div>
              <DocumentIcon />
              <p>Gazette</p>
              <a href={property.gazette} target="_blank">
                <DownloadIcon />
              </a>
            </div>
          ) : (
            ""
          )}
          {property.deedOfAssignment ? (
            <div>
              <DocumentIcon />
              <p>Deed of Assignment</p>
              <a href={property.deedOfAssignment} target="_blank">
                <DownloadIcon />
              </a>
            </div>
          ) : (
            ""
          )}
          {property.certificateOfOccupancy ? (
            <div>
              <DocumentIcon />
              <p>Certificate of Occupancy</p>
              <a href={property.certificateOfOccupancy} target="_blank">
                <DownloadIcon />
              </a>
            </div>
          ) : (
            ""
          )}
          {property.otherDocs.map((item) => (
            <div>
              <DocumentIcon />
              <p>{item.name}</p>
              <a href={item.file} target="_blank">
                <DownloadIcon />
              </a>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Images</h1>
        </div>
        <div className={styles.section__images}>
          <div className={styles.section__images__main}>
            <img src={image} alt="" />
          </div>
          <div className={styles.section__images__list}>
            {property.media.map((image) => (
              <img
                onClick={() => setImage(image)}
                role="button"
                src={image}
                alt=""
              />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Agent</h1>{" "}
          <Link
            target="_blank"
            className={styles.viewBtn}
            to={Routes.user(agent.id)}
          >
            View user <ArrowRight />{" "}
          </Link>
        </div>
        <div className={styles.section__content}>
          <div>
            <span>First Name</span>
            <p>{agent.firstName} </p>
          </div>
          <div>
            <span>Last Name</span>
            <p>{agent.lastName}</p>
          </div>
          <div>
            <span>Email</span>
            <p>{agent.email}</p>
          </div>
          <div>
            <span>Phone number</span>
            <p>{agent.phone}</p>
          </div>
          <div>
            <span>Address</span>
            <p>{agent.address}</p>
          </div>
          <div>
            <span>City</span>
            <p>{agent.city}</p>
          </div>
          <div>
            <span>Country</span>
            <p>{agent.country}</p>
          </div>
        </div>
      </section>
      {homeBuyer ? (
        <section className={styles.section}>
          <div className={styles.section__heading}>
            <h1 className={styles.section__ttl}>
              Home buyer - {homeBuyer?.percentage}% ownership
            </h1>
            <Link
              target="_blank"
              className={styles.viewBtn}
              to={Routes.user(homeBuyer.id)}
            >
              View user <ArrowRight />{" "}
            </Link>
          </div>
          <div className={styles.section__content}>
            <div>
              <span>First Name</span>
              <p>{homeBuyer?.firstName} </p>
            </div>
            <div>
              <span>Last Name</span>
              <p>{homeBuyer?.lastName}</p>
            </div>
            <div>
              <span>Email</span>
              <p>{homeBuyer?.email}</p>
            </div>
            <div>
              <span>Phone number</span>
              <p>{homeBuyer?.phone}</p>
            </div>
            <div>
              <span>Address</span>
              <p>{homeBuyer.address}</p>
            </div>
            <div>
              <span>City</span>
              <p>{homeBuyer.city}</p>
            </div>
            <div>
              <span>Country</span>
              <p>{homeBuyer.country}</p>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      {investors.map((investor, index) => (
        <section key={`investor_${investor.id}`} className={styles.section}>
          <div className={styles.section__heading}>
            <h1 className={styles.section__ttl}>
              Investor ({index + 1}) - {investor.percentage}% ownership
            </h1>{" "}
            <Link
              target="_blank"
              className={styles.viewBtn}
              to={Routes.user(investor.id)}
            >
              View user <ArrowRight />
            </Link>
          </div>
          <div className={styles.section__content}>
            <div>
              <span>First Name</span>
              <p>{investor.firstName} </p>
            </div>
            <div>
              <span>Last Name</span>
              <p>{investor.lastName}</p>
            </div>
            <div>
              <span>Email</span>
              <p>{investor.email}</p>
            </div>
            <div>
              <span>Phone number</span>
              <p>{investor.phone}</p>
            </div>
            <div>
              <span>Address</span>
              <p>{investor.address}</p>
            </div>
            <div>
              <span>City</span>
              <p>{investor.city}</p>
            </div>
            <div>
              <span>Country</span>
              <p>{investor.country}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export { PropertyUI };
