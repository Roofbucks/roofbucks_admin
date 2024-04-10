import { UserProfileUI, UserProps } from "features";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router";
import {
	approveCompanyService,
	suspendData,
	unsuspendData,
	userProfileService,
	userPropertyService,
	suspendUserService,
	unsuspendUserService,
	verifyProfileService,
} from "api";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { Preloader, UserPropertyTableItem } from "components";

const UserProfile = () => {
	const {
		run: runUserProfileData,
		data: userProfileDataResponse,
		requestStatus: userProfileRequestStatus,
	} = useApiRequest({});
	const {
		run: runUserPropertyData,
		data: userPropertyDataResponse,
		requestStatus: userPropertyRequestStatus,
	} = useApiRequest({});
	const {
		run: runSuspendUser,
		data: suspendUserResponse,
		requestStatus: suspendUserRequestStatus,
	} = useApiRequest({});
	const {
		run: runUnsuspendUser,
		data: unsuspendUserResponse,
		requestStatus: unsuspendUserRequestStatus,
	} = useApiRequest({});
	const {
		run: runVerifyProfile,
		data: verifyProfileResponse,
		requestStatus: verifyProfileStatus,
	} = useApiRequest({});
	const {
		run: runApproveCompany,
		data: approveCompanyResponse,
		requestStatus: approveCompanyStatus,
	} = useApiRequest({});

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<UserProps | null>(null);
	const [userProperty, setUserProperty] = useState<UserPropertyTableItem[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalUsers, setTotalUsers] = useState(0);
	const { id } = useParams();

	useMemo(() => {
		if (suspendUserResponse?.status === 200) {
			alert("User Suspended!");
		} else if (suspendUserResponse?.status === 404) {
			alert("User Not Suspended!");
		}
	}, [suspendUserResponse]);
	useMemo(() => {
		if (unsuspendUserResponse?.status === 200) {
			console.log("User Unsuspended!");
		} else if (unsuspendUserResponse?.status === 404) {
			alert("User still Suspended!");
		}
	}, [unsuspendUserResponse]);
	useMemo(() => {
		if (verifyProfileResponse?.status === 200) {
			alert("User Verified!");
		} else if (verifyProfileResponse?.status === 404) {
			alert("User still Unverified!");
		}
	}, [verifyProfileResponse]);
	useMemo(() => {
		if (approveCompanyResponse?.status === 200) {
			alert("Business Verified!");
		} else if (approveCompanyResponse?.status === 404) {
			alert("Business still Unverified!");
		}
	}, [approveCompanyResponse]);
	useMemo(() => {
		if (userProfileDataResponse?.status === 200) {
			const userProfile = userProfileDataResponse.data;
			const ProfileData = {
				firstname: userProfile.firstname,
				lastname: userProfile.lastname,
				email: userProfile.email,
				role: userProfile.role.toLowerCase(),
				dateOfBirth: userProfile.date_of_birth?.substring(0, 10),
				emailVerified: userProfile.email_verified,
				address: userProfile.address,
				city: userProfile.city,
				country: userProfile.country,
				phone: userProfile.phone,
				idDocType: userProfile.identity_document_type.toLowerCase(),
				profileStat: userProfile.profile_status,
				idDocNumber: userProfile.identity_document_number,
				idDocExpiryDate: userProfile.identity_document_expiry_date?.substring(
					0,
					10
				),
				idAlbumDoc1: userProfile.identity_document_album?.[0]?.document,
				idAlbumDoc2: userProfile.identity_document_album?.[1]?.document,
				businessInfo: userProfile.business_info,
				displayPhoto: userProfile.display_photo,
				bankInfo: userProfile.bank_information,
				bankCountry: userProfile.bank_information[0]?.country,
				bankName: userProfile.bank_information[0]?.bank_name,
				accountName: userProfile.bank_information[0]?.account_name,
				accountNumber: userProfile.bank_information[0]?.account_number,
				proofOfAddress: userProfile.proof_of_address_document,
			};
			setUser(ProfileData);
		} else if (userProfileDataResponse?.status === 404) {
			console.log("there was an error");
		}
	}, [userProfileDataResponse]);
	useMemo(() => {
		if (userPropertyDataResponse?.status === 200) {
			const userData = userPropertyDataResponse.data.results;
			setTotalUsers(userPropertyDataResponse?.data.total);
			setTotalPages(userPropertyDataResponse?.data.pages);
			console.log(userProfileDataResponse);

			const userList = userData.map((item) => ({
				propertyID: item.id?.substring(0, 8),
				propertyName: item.name,
				amount: item.total_property_cost,
				status: item.moderation_status?.toLowerCase(),
				date: item.created_at?.substring(0, 10),
			}));
			setUserProperty(userList);
		} else if (userPropertyDataResponse?.status === 404) {
			console.log("there was an error");
		}
	}, [userPropertyDataResponse]);

	useEffect(() => {
		runUserProfileData(userProfileService(id));
		runUserPropertyData(userPropertyService(id));
	}, [id]);

	useEffect(() => {
		setLoading(
			userProfileRequestStatus.isPending ||
				suspendUserRequestStatus.isPending ||
				unsuspendUserRequestStatus.isPending ||
				verifyProfileStatus.isPending ||
				approveCompanyStatus.isPending ||
				userPropertyRequestStatus.isPending
		);
	}, [
		userProfileRequestStatus,
		unsuspendUserRequestStatus,
		suspendUserRequestStatus,
		verifyProfileStatus,
		approveCompanyStatus,
		userPropertyRequestStatus,
	]);

	const handleView = (id) => navigate(Routes.property(id));
	const handleSuspend = (data: suspendData) => {
		runSuspendUser(suspendUserService(data))
			.then(() => {
				return runUserProfileData(userProfileService(id));
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleUnsuspend = (data: unsuspendData) => {
		runUnsuspendUser(unsuspendUserService(data))
			.then(() => {
				return runUserProfileData(userProfileService(id));
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleVerifyProfile = (id) => {
		runVerifyProfile(verifyProfileService(id))
			.then(() => {
				return runUserProfileData(userProfileService(id));
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleApproveCompany = (id) => {
		runApproveCompany(approveCompanyService(user?.businessInfo.businessId))
			.then(() => {
				return runUserProfileData(userProfileService(id));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handlePages = (currentPage) => {
		setCurrentPage(currentPage);
	};

	const navigate = useNavigate();
	return (
		<>
			<Preloader loading={loading} />
			<UserProfileUI
				handleView={handleView}
				handleSuspend={handleSuspend}
				handleUnsuspend={handleUnsuspend}
				handleVerifyProfile={handleVerifyProfile}
				handleApproveCompany={handleApproveCompany}
				property={userProperty}
				pagination={{
					handleChange: handlePages,
					total: totalPages,
					current: currentPage,
					count: totalUsers,
					limit: 10,
				}}
				id={id}
				firstname={user?.firstname || ""}
				lastname={user?.lastname || ""}
				email={user?.email || ""}
				role={user?.role || ""}
				dateOfBirth={user?.dateOfBirth || ""}
				emailVerified={user?.emailVerified || false}
				address={user?.address || ""}
				city={user?.city || ""}
				country={user?.country || ""}
				phone={user?.phone || ""}
				idDocType={user?.idDocType || ""}
				profileStat={user?.profileStat || ""}
				idDocNumber={user?.idDocNumber || ""}
				idDocExpiryDate={user?.idDocExpiryDate || ""}
				idAlbumDoc1={user?.idAlbumDoc1 || ""}
				idAlbumDoc2={user?.idAlbumDoc2 || ""}
				businessInfo={
					user?.businessInfo || {
						businessId: 0,
						isVerified: false,
						companyLogo: "",
						regName: "",
						regNumber: "",
						email: "",
						phone: "",
						country: "",
						city: "",
						displayName: "",
						desc: "",
						certificate: "",
					}
				}
				displayPhoto={user?.displayPhoto || ""}
				bankCountry={user?.bankCountry || ""}
				bankName={user?.bankName || ""}
				accountName={user?.accountName || ""}
				accountNumber={user?.accountNumber || ""}
				proofOfAddress={user?.proofOfAddress || ""}
			/>
		</>
	);
};

export { UserProfile };
