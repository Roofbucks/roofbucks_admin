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
	handleVerifyProfile: (id) => void;
	handleApproveCompany: (id) => void;
	id: string | undefined;
	firstname: string;
	lastname: string;
	email: string;
	role: string;
	dateOfBirth: string;
	emailVerified: boolean;
	address: string;
	city: string;
	country: string;
	phone: string;
	idDocType: string;
	profileStat: string;
	idDocNumber: string;
	idDocExpiryDate: string;
	idAlbumDoc1: string;
	idAlbumDoc2: string;
	businessInfo: {
		businessId: number;
		isVerified: boolean;
		companyLogo: string;
		regName: string;
		regNumber: string;
		email: string;
		phone: string;
		country: string;
		city: string;
		displayName: string;
		desc: string;
		certificate: string;
	};
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
		| "handleVerifyProfile"
		| "handleApproveCompany"
		| "id"
	>
>;

const UserProfileUI: React.FC<UserProfileProps> = ({
	handleView,
	handleSuspend,
	handleUnsuspend,
	handleVerifyProfile,
	handleApproveCompany,
	id,
	firstname,
	lastname,
	email,
	role,
	dateOfBirth,
	emailVerified,
	address,
	city,
	country,
	phone,
	idDocType,
	profileStat,
	idDocNumber,
	idDocExpiryDate,
	idAlbumDoc1,
	idAlbumDoc2,
	businessInfo,
	displayPhoto,
	bankCountry,
	bankName,
	accountName,
	accountNumber,
	proofOfAddress,
	property,
	pagination,
}) => {
	const navigate = useNavigate();
	const suspendData: suspendData = {
		email: email,
	};
	const unsuspendData: unsuspendData = {
		email: email,
	};

	const handleClick = () => {
		if (profileStat === "VERIFIED") {
			handleSuspend(suspendData);
		} else if (profileStat === "SUSPENDED") {
			handleUnsuspend(unsuspendData);
		} else if (profileStat === "UNVERIFIED") {
			handleVerifyProfile(id);
		}
	};

	const handleBusiness = () => {
		if (!businessInfo.isVerified) {
			handleApproveCompany(businessInfo.businessId);
		}
	};

	useEffect(() => {}, [profileStat, businessInfo.isVerified]);

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
						<span className={`${styles.tag} ${styles[profileStat]}`}>
							{profileStat === "VERIFIED"
								? "Verified"
								: profileStat === "UNVERIFIED"
								? "Unverified"
								: profileStat === "SUSPENDED"
								? "Suspended"
								: "Unknown Status"}
						</span>
					</div>
					<Button
						className={`${styles[profileStat]} ${styles.active}`}
						type="primary"
						onClick={handleClick}
					>
						{profileStat === "UNVERIFIED"
							? "Verify Personal Profile"
							: profileStat === "VERIFIED"
							? "Suspend Account"
							: profileStat === "SUSPENDED"
							? "Unsuspend Account"
							: "Unknown Action"}
					</Button>
				</div>
				<div className={styles.section__content}>
					<div className={styles.imageSec}>
						<img className={styles.image} src={displayPhoto} alt="avatar" />
						<div>
							<span>First name </span>
							<p>{firstname}</p>
						</div>
					</div>
					<div>
						<span>Last name</span>
						<p>{lastname}</p>
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
						<p>{idDocType}</p>
					</div>
					<div>
						<span>ID No</span>
						<p>{idDocNumber}</p>
					</div>
					<div>
						<span>Expiration Date</span>
						<p>{idDocExpiryDate}</p>
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
							{businessInfo.isVerified === true ? "Verified" : "Unverified"}
						</span>
					</div>
					{!businessInfo.isVerified && (
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
							src={businessInfo.companyLogo}
							alt="company logo"
						/>
						<div>
							<span>Company Name</span>
							<p>{businessInfo.regName}</p>
						</div>
					</div>
					<div>
						<span>Registration No</span>
						<p>{businessInfo.regNumber}</p>
					</div>

					<div>
						<span>Email</span>
						<p>{businessInfo.email}</p>
					</div>
					<div>
						<span>City</span>
						<p>{businessInfo.city}</p>
					</div>
					<div>
						<span>Country</span>
						<p>{businessInfo.country}</p>
					</div>
				</div>
				<div className={styles.description}>
					<span>Description</span>
					<p>{businessInfo.desc}</p>
				</div>
				<div className={styles.section__documents}>
					{businessInfo.certificate && (
						<div>
							<DocumentIcon />
							<p>Certificate of Incorporation</p>
							<a href={businessInfo.certificate}>
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
