import {
  ArrowRight,
  DocumentIcon,
  DownloadIcon,
  EmptyStreet,
  placeholderAvatar,
} from "assets";
import styles from "./styles.module.scss";
import {
  Button,
  EmptyTable,
  Pagination,
  Table,
  TableHeaderItemProps,
  UserPropertyTable,
  UserPropertyTableItem,
} from "components";

interface PersonalInfo {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  type: "agent" | "shareholder";
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  status: "verified" | "unverified" | "suspended";
}
interface PersonalIdentification {
  idType: string;
  idNo: string;
  expiration: string;
  idFrontPage: string | undefined;
  idBackPage: string | undefined;
  proofOfAddress: string | undefined;
}
interface BusinessInfo {
  logo: string;
  companyName: string;
  regNo: string;
  email: string;
  city: string;
  country: string;
  description: string;
  certOfInc: string | undefined;
  isVerified: boolean;
  id: string;
}
interface BillingInfo {
  bank: string;
  accountName: string;
  accountNumber: string;
  country: string;
}

export interface UserProfileData {
  personal: PersonalInfo;
  identification: PersonalIdentification;
  business: BusinessInfo | undefined;
  billing: BillingInfo;
}

interface UserProfileProps {
  handleView: (id: string) => void;
  user: UserProfileData;
  properties: UserPropertyTableItem[];
  pagination: {
    handleChange: (page: number) => void;
    totalPages: number;
    currentPage: number;
    totalCount: number;
    pageLimit: number;
  };
  handleBack: () => void;
  handleApproveBusiness: () => void;
  handleSuspendUser: () => void;
  handleUnsuspendUser: () => void;
  handleVerifyProfile: () => void;
}

const UserProfileUI: React.FC<UserProfileProps> = ({
  handleView,
  user,
  properties,
  pagination,
  handleBack,
  handleApproveBusiness,
  handleSuspendUser,
  handleUnsuspendUser,
  handleVerifyProfile,
}) => {
  const { personal, billing, business, identification } = user;
  const tableHeaderTitles: TableHeaderItemProps[] = [
    { title: "ID" },
    { title: "Name" },
    { title: "Amount" },
    { title: "Market Value" },
    { title: "Date Created" },
    { title: user.personal.type === "shareholder" ? "Ownership %" : "Status" },
    { title: "" },
  ];
  return (
    <>
      <Button className={styles.backBtn} type="tertiary" onClick={handleBack}>
        <ArrowRight />
        Back
      </Button>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Personal Information</h1>{" "}
          <p
            className={`${styles.personalStatus} ${
              personal.status === "verified"
                ? styles.isVerified
                : styles.unverified
            }`}
          >
            {personal.status}
          </p>
          {personal.status === "unverified" ? (
            <Button
              disabled={!identification.idNo}
              className={styles.actionBtn}
              type="primary"
              onClick={handleVerifyProfile}
            >
              Verify profile
            </Button>
          ) : (
            <Button
              className={styles.suspend}
              type="primary"
              onClick={() => {
                personal.status === "verified"
                  ? handleSuspendUser()
                  : handleUnsuspendUser();
              }}
            >
              {personal.status === "verified"
                ? "Suspend account"
                : "Unsuspend account"}
            </Button>
          )}
        </div>
        <div className={styles.section__content}>
          <div className={styles.imageSec}>
            <img className={styles.image} src={personal.avatar} alt="avatar" />
            <div>
              <span>First name</span>
              <p>{personal.firstName}</p>
            </div>
          </div>
          <div>
            <span>Last name</span>
            <p>{personal.lastName}</p>
          </div>
          <div>
            <span>Email</span>
            <p style={{ textTransform: "lowercase" }}>{personal.email}</p>
          </div>
          <div>
            <span>Account Type</span>
            <p>{personal.type}</p>
          </div>
          <div>
            <span>Date of Birth</span>
            <p>{personal.dateOfBirth}</p>
          </div>
          <div>
            <span>Address</span>
            <p>{personal.address}</p>
          </div>
          <div>
            <span>City</span>
            <p>{personal.city}</p>
          </div>
          <div>
            <span>Country</span>
            <p>{personal.country}</p>
          </div>
          <div>
            <span>Phone number</span>
            <p>{personal.phoneNumber}</p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Personal Identification</h1>
        </div>
        <div className={styles.section__content}>
          <div>
            <span>ID Type</span>
            <p>{identification.idType}</p>
          </div>
          <div>
            <span>ID No</span>
            <p>{identification.idNo}</p>
          </div>
          <div>
            <span>Expiration Date</span>
            <p>{identification.expiration}</p>
          </div>
        </div>

        {identification.idBackPage ? (
          <div className={styles.section__documents}>
            <div>
              <DocumentIcon />
              <p>ID Front Page</p>
              <a
                download={`${identification.idType}_1`}
                href={identification.idFrontPage}
                target="blank"
              >
                <DownloadIcon />
              </a>
            </div>
            <div>
              <DocumentIcon />
              <p>ID Back Page</p>
              <a href={identification.idBackPage} target="blank">
                <DownloadIcon />
              </a>
            </div>
            <div>
              <DocumentIcon />
              <p>Proof of Address</p>
              <a href={identification.proofOfAddress} target="blank">
                <DownloadIcon />
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </section>
      {business ? (
        <section className={styles.section}>
          <div className={styles.section__heading}>
            <h1 className={styles.section__ttl}>Business Information</h1>
            {business.isVerified ? (
              <p className={styles.isVerified}>Verified</p>
            ) : (
              <Button
                // disabled={!business.certOfInc}
                className={styles.actionBtn}
                type="primary"
                onClick={handleApproveBusiness}
              >
                Approve business
              </Button>
            )}
          </div>
          <div className={styles.section__content}>
            <div className={styles.imageSec}>
              <img
                className={styles.image}
                src={business.logo}
                alt="company logo"
              />
              <div>
                <span>Company Name</span>
                <p>{business.companyName}</p>
              </div>
            </div>
            <div>
              <span>Registration No</span>
              <p>{business.regNo}</p>
            </div>
            <div>
              <span>Email</span>
              <p style={{ textTransform: "lowercase" }}>{business.email}</p>
            </div>
            <div>
              <span>City</span>
              <p>{business.city}</p>
            </div>
            <div>
              <span>Country</span>
              <p>{business.country}</p>
            </div>
          </div>
          <div className={styles.description}>
            <span>Description</span>
            <p>{business.description}</p>
          </div>
          {business.certOfInc ? (
            <div className={styles.section__documents}>
              <div>
                <DocumentIcon />
                <p>Certificate of Incorporation</p>
                <a href={business.certOfInc} target="blank">
                  <DownloadIcon />
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
        </section>
      ) : (
        ""
      )}
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Billing Information</h1>
        </div>
        <div className={styles.section__content}>
          <div>
            <span>Bank</span>
            <p>{billing.bank}</p>
          </div>
          <div>
            <span>Account name</span>
            <p>{billing.accountName}</p>
          </div>
          <div>
            <span>Account number</span>
            <p>{billing.accountNumber}</p>
          </div>
          <div>
            <span>Country</span>
            <p>{billing.country}</p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>
            Properties <span>({pagination.totalCount})</span>
          </h1>
        </div>
        <Table
          tableHeaderTitles={tableHeaderTitles}
          tableBody={
            <UserPropertyTable
              tableBodyItems={properties}
              view={handleView}
              tableBodyRowClassName={styles.tableBodyItem}
              isShareholder={user.personal.type === "shareholder"}
            />
          }
          customTableClasses={{
            tableContainerClassName: styles.tableWrap,
            tableHeaderClassName: styles.tableHeader,
            tableHeaderItemClassName: styles.tableHeaderItem,
          }}
          emptyTable={{
            show: properties.length === 0,
            element: (
              <EmptyTable
                Vector={EmptyStreet}
                heading={"No properties found"}
                text={
                  "There are no properties associated with this user at this time"
                }
              />
            ),
          }}
        />
        <Pagination {...pagination} name={"Properties"} />
      </section>
    </>
  );
};

export { UserProfileUI };
