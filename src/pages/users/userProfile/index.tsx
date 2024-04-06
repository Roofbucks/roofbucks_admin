import { UserProfileUI, UserProps } from "features";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router";
import {
  businessVerifyService,
  suspendData,
  unsuspendData,
  userProfileService,
  userPropertyService,
  userSuspendService,
  userUnsuspendService,
  userVerifyService,
} from "api";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { Preloader, UserPropertyTableItem } from "components";

const UserProfile = () => {
  const {
    run: runUserPropertyData,
    data: userPropertyDataResponse,
    requestStatus: userPropertyStatus,
  } = useApiRequest({});
  const {
    run: runUserProfileData,
    data: userProfileDataResponse,
    requestStatus: userRequestStatus,
  } = useApiRequest({});
  const {
    run: runUserSuspend,
    data: userSuspendResponse,
    requestStatus: suspendRequestStatus,
  } = useApiRequest({});
  const {
    run: runUserUnsuspend,
    data: userUnsuspendResponse,
    requestStatus: unsuspendRequestStatus,
  } = useApiRequest({});
  const {
    run: runUserVerify,
    data: userVerifyResponse,
    requestStatus: userVerifyStatus,
  } = useApiRequest({});
  const {
    run: runBusinessVerify,
    data: businessVerifyResponse,
    requestStatus: businessVerifyStatus,
  } = useApiRequest({});

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const [userProperty, setUserProperty] = useState<UserPropertyTableItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const { id } = useParams();

  useMemo(() => {
    if (userSuspendResponse?.status === 200) {
      alert("User Suspended!");
    } else if (userSuspendResponse?.status === 404) {
      alert("User Not Suspended!");
    }
  }, [userSuspendResponse]);
  useMemo(() => {
    if (userUnsuspendResponse?.status === 200) {
      console.log("User Unsuspended!");
    } else if (userUnsuspendResponse?.status === 404) {
      alert("User still Suspended!");
    }
  }, [userUnsuspendResponse]);
  useMemo(() => {
    if (userVerifyResponse?.status === 200) {
      alert("User Verified!");
    } else if (userVerifyResponse?.status === 404) {
      alert("User still Unverified!");
    }
  }, [userVerifyResponse]);
  useMemo(() => {
    if (businessVerifyResponse?.status === 200) {
      alert("Business Verified!");
    } else if (businessVerifyResponse?.status === 404) {
      alert("Business still Unverified!");
    }
  }, [businessVerifyResponse]);
  useMemo(() => {
    if (userProfileDataResponse?.status === 200) {
      const userProfile = userProfileDataResponse.data;
      const ProfileData = {
        firstName: userProfile.firstname,
        lastName: userProfile.lastname,
        email: userProfile.email,
        role: userProfile.role.toLowerCase(),
        dateOfBirth: userProfile.date_of_birth?.substring(0, 10),
        emailVerified: userProfile.email_verified,
        address: userProfile.address,
        city: userProfile.city,
        country: userProfile.country,
        phone: userProfile.phone,
        idType: userProfile.identity_document_type.toLowerCase(),
        profileStatus: userProfile.profile_status,
        idNumber: userProfile.identity_document_number,
        idExpiryDate: userProfile.identity_document_expiry_date?.substring(
          0,
          10
        ),
        idAlbumDoc1: userProfile.identity_document_album?.[0]?.document,
        idAlbumDoc2: userProfile.identity_document_album?.[1]?.document,
        businessID: userProfile.business_info.id,
        isVerified: userProfile.business_info.is_verified,
        companyLogo: userProfile.business_info.company_logo,
        regName: userProfile.business_info.registered_name,
        regNumber: userProfile.business_info.registeration_number,
        businessEmail: userProfile.business_info.email,
        businessPhone: userProfile.business_info.phone,
        businessCountry: userProfile.business_info.country,
        businessCity: userProfile.business_info.city,
        displayName: userProfile.business_info.display_name,
        desc: userProfile.business_info.description,
        certificate: userProfile.business_info.certificate_of_incorporation,
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
      console.log(userProfileDataResponse)

      const userList = userData.map((item) => ({
        propertyID: item.id?.substring(0, 6),
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
      userRequestStatus.isPending ||
        suspendRequestStatus.isPending ||
        unsuspendRequestStatus.isPending ||
        userVerifyStatus.isPending ||
        businessVerifyStatus.isPending
    );
  }, [
    userRequestStatus,
    unsuspendRequestStatus,
    suspendRequestStatus,
    userVerifyStatus,
    businessVerifyStatus,
  ]);

  const handleView = (id) => navigate(Routes.property(id));
  const handleSuspend = (data: suspendData) => {
    runUserSuspend(userSuspendService(data))
      .then(() => {
        return runUserProfileData(userProfileService(id));
      })
      .catch((error) => {console.log(error)});
  };
   const handleUnsuspend = (data: unsuspendData) => {
     runUserUnsuspend(userUnsuspendService(data))
      .then(() => {
        return runUserProfileData(userProfileService(id));
      })
      .catch((error)=> {console.log(error)})
  };
  const handleVerifyUser = (id) => {
    runUserVerify(userVerifyService(id))
      .then(() => {
        return runUserProfileData(userProfileService(id));
      })
      .catch((error)=> {console.log(error)})
  };
  const handleVerifyBusiness = (id) => {
    runBusinessVerify(businessVerifyService(user?.businessID))
      .then(() => {
        return runUserProfileData(userProfileService(id));
      })
      .catch((error)=> {console.log(error)})
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
        handleVerifyUser={handleVerifyUser}
        handleVerifyBusiness={handleVerifyBusiness}
        property={userProperty}
        pagination={{
          handleChange: handlePages,
          total: totalPages,
          current: currentPage,
          count: totalUsers,
          limit: 10,
        }}
        id={id}
        firstName={user?.firstName || ""}
        lastName={user?.lastName || ""}
        email={user?.email || ""}
        role={user?.role || ""}
        dateOfBirth={user?.dateOfBirth || ""}
        emailVerified={user?.emailVerified || false}
        address={user?.address || ""}
        city={user?.city || ""}
        country={user?.country || ""}
        phone={user?.phone || ""}
        idType={user?.idType || ""}
        profileStatus={user?.profileStatus || ""}
        idNumber={user?.idNumber || ""}
        idExpiryDate={user?.idExpiryDate || ""}
        idAlbumDoc1={user?.idAlbumDoc1 || ""}
        idAlbumDoc2={user?.idAlbumDoc2 || ""}
        businessID={user?.businessID || 0}
        isVerified={user?.isVerified || false}
        companyLogo={user?.companyLogo || ""}
        regName={user?.regName || ""}
        regNumber={user?.regNumber || ""}
        businessEmail={user?.businessEmail || ""}
        businessPhone={user?.businessPhone || ""}
        businessCountry={user?.businessCountry || ""}
        businessCity={user?.businessCity || ""}
        displayName={user?.displayName || ""}
        desc={user?.desc || ""}
        certificate={user?.certificate || ""}
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
