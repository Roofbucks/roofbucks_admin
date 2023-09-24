import { ArrowRight, DocumentIcon, DownloadIcon, EmptyStreet } from "assets";
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

const tableHeaderTitles: TableHeaderItemProps[] = [
  { title: "ID" },
  { title: "Name" },
  { title: "Amount" },
  { title: "Date Created" },
  { title: "Status" },
  { title: "" },
];

const property: UserPropertyTableItem = {
  propertyID: "123",
  propertyName: "New house",
  status: "pending",
  date: "12/08/2023",
  amount: "NGN 200,000",
};

interface UserProfileProps {
  handleView: (id: string) => void;
}

const UserProfileUI: React.FC<UserProfileProps> = ({ handleView }) => {
  return (
    <>
      <Button className={styles.backBtn} type="tertiary" onClick={() => {}}>
        <ArrowRight />
        Back
      </Button>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Personal Information</h1>
          <Button className={styles.suspend} type="primary" onClick={() => {}}>
            Suspend account
          </Button>
        </div>
        <div className={styles.section__content}>
          <div>
            <span>First name</span>
            <p>John Doe</p>
          </div>
          <div>
            <span>Last name</span>
            <p>John Doe</p>
          </div>
          <div>
            <span>Email</span>
            <p>JohnDoe@gmail.com</p>
          </div>
          <div>
            <span>Account Type</span>
            <p>Agent</p>
          </div>
          <div>
            <span>Date of Birth</span>
            <p>01/01/1991</p>
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
          <div>
            <span>Phone number</span>
            <p>08199228822</p>
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
            <p>John Doe</p>
          </div>
          <div>
            <span>ID No</span>
            <p>John Doe</p>
          </div>
          <div>
            <span>Expiration Date</span>
            <p>01/01/1991</p>
          </div>
        </div>

        <div className={styles.section__documents}>
          <div>
            <DocumentIcon />
            <p>ID Front Page</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
          <div>
            <DocumentIcon />
            <p>ID Back Page</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
          <div>
            <DocumentIcon />
            <p>Proof of Address</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Business Information</h1>
          <Button
            className={styles.actionBtn}
            type="primary"
            onClick={() => {}}
          >
            Verify business
          </Button>
        </div>
        <div className={styles.section__content}>
          <div>
            <span>Registration No</span>
            <p>John Doe</p>
          </div>
          <div>
            <span>Company Name</span>
            <p>John Doe</p>
          </div>
          <div>
            <span>Email</span>
            <p>info@company.com</p>
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
        <div className={styles.description}>
          <span>Description</span>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
            nesciunt iste, quam numquam minima repellendus molestias laboriosam
            aliquam eaque, error, iusto soluta modi accusantium porro odit
            natus! Quod, nihil ad!
          </p>
        </div>
        <div className={styles.section__documents}>
          <div>
            <DocumentIcon />
            <p>Certificate of Incorporation</p>
            <a>
              <DownloadIcon />
            </a>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>Billing Information</h1>
        </div>
        <div className={styles.section__content}>
          <div>
            <span>Bank</span>
            <p>Access Bank</p>
          </div>
          <div>
            <span>Account name</span>
            <p>John Doe</p>
          </div>
          <div>
            <span>Account number</span>
            <p>0198777255</p>
          </div>
          <div>
            <span>Country</span>
            <p>Nigeria</p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.section__heading}>
          <h1 className={styles.section__ttl}>
            Properties <span>(21)</span>
          </h1>
        </div>
        <Table
          tableHeaderTitles={tableHeaderTitles}
          tableBody={
            <UserPropertyTable
              tableBodyItems={new Array(10).fill(property)}
              view={handleView}
              tableBodyRowClassName={styles.tableBodyItem}
            />
          }
          customTableClasses={{
            tableContainerClassName: styles.tableWrap,
            tableHeaderClassName: styles.tableHeader,
            tableHeaderItemClassName: styles.tableHeaderItem,
          }}
          emptyTable={{
            show: false,
            element: (
              <EmptyTable
                Vector={EmptyStreet}
                heading={"No user found"}
                text={"There are no users at this time"}
              />
            ),
          }}
        />
        <Pagination
          currentPage={1}
          totalPages={3}
          handleChange={console.log}
          totalCount={21}
          pageLimit={10}
          name={"Properties"}
        />
      </section>
    </>
  );
};

export { UserProfileUI };
