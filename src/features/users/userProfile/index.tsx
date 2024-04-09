import {
	ArrowRight,
	DocumentIcon,
	DownloadIcon,
	EmptyStreet,
	ErrorIcon,
	TickIcon,
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
import { Routes } from "router";
import { useNavigate } from "react-router-dom";
import { suspendData, unsuspendData } from "api";
import { useEffect } from "react";

const tableHeaderTitles: TableHeaderItemProps[] = [
	{ title: "ID" },
	{ title: "Name" },
	{ title: "Amount" },
	{ title: "Date Created" },
	{ title: "Status" },
	{ title: "" },
];

interface UserProfileProps {
	property: UserPropertyTableItem[];
	pagination: {
		handleChange: (page) => void;
		total: number;
		current: number;
		count: number;
		limit: number;
	};
	handleView: (id: string) => void;
	handleSuspend: (data: suspendData) => void;
	handleUnsuspend: (data: unsuspendData) => void;
	handleVerifyUser: (id) => void;
	handleVerifyBusiness: (id) => void;
	id: string | undefined;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	dateOfBirth: string;
	emailVerified: boolean;
	address: string;
	city: string;
	country: string;
	phone: string;
	idType: string;
	profileStatus: string;
	idNumber: string;
	idExpiryDate: string;
	idAlbumDoc1: string;
	idAlbumDoc2: string;
	businessID: number;
	isVerified: boolean;
	companyLogo: string;
	regName: string;
	regNumber: string;
	businessEmail: string;
	businessPhone: string;
	businessCountry: string;
	businessCity: string;
	displayName: string;
	desc: string;
	certificate: string;
	displayPhoto: string;
	bankCountry: string;
	bankName: string;
	accountName: string;
	accountNumber: string;
	proofOfAddress: string;
}

export type UserProps = Pick<
	UserProfileProps,
	Exclude<
		keyof UserProfileProps,
		| "handleView"
		| "property"
		| "pagination"
		| "handleSuspend"
		| "handleUnsuspend"
		| "handleVerifyUser"
		| "handleVerifyBusiness"
		| "id"
	>
>;

const UserProfileUI: React.FC<UserProfileProps> = ({
	handleView,
	handleSuspend,
	handleUnsuspend,
	handleVerifyUser,
	handleVerifyBusiness,
	id,
	property,
	pagination,
	firstName,
	lastName,
	email,
	role,
	dateOfBirth,
	emailVerified,
	address,
	city,
	country,
	phone,
	idType,
	profileStatus,
	idNumber,
	idExpiryDate,
	idAlbumDoc1,
	idAlbumDoc2,
	businessID,
	isVerified,
	companyLogo,
	regName,
	regNumber,
	businessEmail,
	businessPhone,
	businessCountry,
	businessCity,
	displayName,
	desc,
	certificate,
	displayPhoto,
	bankCountry,
	bankName,
	accountName,
	accountNumber,
	proofOfAddress,
}) => {
	const navigate = useNavigate();
	const suspendData: suspendData = {
		email: email,
	};
	const unsuspendData: unsuspendData = {
		email: email,
	};

	const handleClick = () => {
		if (profileStatus === "VERIFIED") {
			handleSuspend(suspendData);
		} else if (profileStatus === "SUSPENDED") {
			handleUnsuspend(unsuspendData);
		} else if (profileStatus === "UNVERIFIED") {
			handleVerifyUser(id);
		}
	};

	const handleBusiness = () => {
		if (!isVerified) {
			handleVerifyBusiness(businessID);
		}
	};

	useEffect(() => {}, [profileStatus, isVerified]);

	return (
		<>
			<Button
				className={styles.backBtn}
				type="tertiary"
				onClick={() => {
					navigate(Routes.users);
				}}
			>
				<ArrowRight />
				Back
			</Button>
			<section className={styles.section}>
				<div className={styles.section__heading}>
					<div className={styles.profile}>
						<h1 className={styles.section__ttl}>Personal Information</h1>
						<span className={`${styles.tag} ${styles[profileStatus]}`}>
							{profileStatus === "VERIFIED"
								? "Verified"
								: profileStatus === "UNVERIFIED"
								? "Unverified"
								: profileStatus === "SUSPENDED"
								? "Suspended"
								: "Unknown Status"}
						</span>
					</div>
					<Button
						className={`${styles[profileStatus]} ${styles.active}`}
						type="primary"
						onClick={handleClick}
					>
						{profileStatus === "UNVERIFIED"
							? "Verify Personal Profile"
							: profileStatus === "VERIFIED"
							? "Suspend Account"
							: profileStatus === "SUSPENDED"
							? "Unsuspend Account"
							: "Unknown Action"}
					</Button>
				</div>
				<div className={styles.section__content}>
					<div className={styles.imageSec}>
						<img className={styles.image} src={displayPhoto} alt="avatar" />
						<div>
							<span>First name </span>
							<p>{firstName}</p>
						</div>
					</div>
					<div>
						<span>Last name</span>
						<p>{lastName}</p>
					</div>
					<div>
						<span>Email</span>
						<p className={styles.email}>
							{emailVerified ? (
								<TickIcon title="Email verified" />
							) : (
								<ErrorIcon title="Unverified email" />
							)}
							{email}
						</p>
					</div>
					<div>
						<span>Account Type</span>
						<p>{role}</p>
					</div>
					<div>
						<span>Date of Birth</span>
						<p>{dateOfBirth}</p>
					</div>
					<div>
						<span>Address</span>
						<p>{address}</p>
					</div>
					<div>
						<span>City</span>
						<p>{city}</p>
					</div>
					<div>
						<span>Country</span>
						<p>{country}</p>
					</div>
					<div>
						<span>Phone number</span>
						<p>{phone}</p>
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
						<p>{idType}</p>
					</div>
					<div>
						<span>ID No</span>
						<p>{idNumber}</p>
					</div>
					<div>
						<span>Expiration Date</span>
						<p>{idExpiryDate}</p>
					</div>
				</div>

				<div className={styles.section__documents}>
					{idAlbumDoc1 && (
						<div>
							<DocumentIcon />
							<p>ID Front Page</p>
							<a href={idAlbumDoc1}>
								<DownloadIcon />
							</a>
						</div>
					)}
					{idAlbumDoc2 && (
						<div>
							<DocumentIcon />
							<p>ID Back Page</p>
							<a href={idAlbumDoc2}>
								<DownloadIcon />
							</a>
						</div>
					)}
					{proofOfAddress && (
						<div>
							<DocumentIcon />
							<p>Proof of Address</p>
							<a href={proofOfAddress}>
								<DownloadIcon />
							</a>
						</div>
					)}
				</div>
			</section>
			<section className={styles.section}>
				<div className={styles.section__heading}>
					<div className={styles.profile}>
						<h1 className={styles.section__ttl}>Business Information</h1>
						<span className={styles.tag}>
							{isVerified === true ? "Verified" : "Unverified"}
						</span>
					</div>
					{!isVerified && (
						<Button
							className={styles.actionBtn}
							type="primary"
							onClick={handleBusiness}
						>
							Verify Business
						</Button>
					)}
				</div>
				<div className={styles.section__content}>
					<div className={styles.imageSec}>
						<img
							className={styles.image}
							src={companyLogo}
							alt="company logo"
						/>
						<div>
							<span>Company Name</span>
							<p>{regName}</p>
						</div>
					</div>
					<div>
						<span>Registration No</span>
						<p>{regNumber}</p>
					</div>

					<div>
						<span>Email</span>
						<p>{businessEmail}</p>
					</div>
					<div>
						<span>City</span>
						<p>{businessCity}</p>
					</div>
					<div>
						<span>Country</span>
						<p>{businessCountry}</p>
					</div>
				</div>
				<div className={styles.description}>
					<span>Description</span>
					<p>{desc}</p>
				</div>
				<div className={styles.section__documents}>
					{certificate && (
						<div>
							<DocumentIcon />
							<p>Certificate of Incorporation</p>
							<a href={certificate}>
								<DownloadIcon />
							</a>
						</div>
					)}
				</div>
			</section>
			<section className={styles.section}>
				<div className={styles.section__heading}>
					<h1 className={styles.section__ttl}>Billing Information</h1>
				</div>
				<div className={styles.section__content}>
					<div>
						<span>Bank</span>
						<p>{bankName}</p>
					</div>
					<div>
						<span>Account name</span>
						<p>{accountName}</p>
					</div>
					<div>
						<span>Account number</span>
						<p>{accountNumber}</p>
					</div>
					<div>
						<span>Country</span>
						<p>{bankCountry}</p>
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
							tableBodyItems={property}
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
					currentPage={pagination.current}
					totalPages={pagination.total}
					handleChange={pagination.handleChange}
					totalCount={pagination.count}
					pageLimit={pagination.limit}
					name={"Properties"}
				/>
			</section>
		</>
	);
};

export { UserProfileUI };
