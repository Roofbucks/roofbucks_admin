import {
  ArrowRight,
  DocumentIcon,
  DownloadIcon,
  placeholderAvatar,
} from "assets";
import styles from "./styles.module.scss";
import { Button } from "components";
import { useEffect, useState } from "react";

export interface PropertyEditData {
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
  agent: string;
}

interface PropertyProps {
  goBack: () => void;
  handleApprove: () => void;
  handleReject: () => void;
  property: PropertyEditData;
}

const PropertyEditUI: React.FC<PropertyProps> = ({
  goBack,
  handleApprove,
  handleReject,
  property,
}) => {
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
            {/* Only show for pending property */}
            {property.status === "pending" ? (
              <>
                <Button
                  className={styles.actionBtn}
                  type="primary"
                  onClick={handleApprove}
                >
                  Approve Changes
                </Button>
                <Button
                  className={`${styles.actionBtn} ${styles.rejectBtn}`}
                  type="secondary"
                  onClick={handleReject}
                >
                  Reject Changes
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
            <span>Agent</span>
            <p>{property.agent}</p>
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
            <p>{property.totalCost}</p>
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
    </>
  );
};

export { PropertyEditUI };
