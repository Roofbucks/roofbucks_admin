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
import { Preloader, Toast, UserPropertyTableItem } from "components";

const UserProfile = () => {
  const {
    run: runUserPropertyData,
    data: userPropertyDataResponse,
    requestStatus: userPropertyStatus,
    error: userPropertyError
  } = useApiRequest({});
  const {
    run: runUserProfileData,
    data: userProfileDataResponse,
    requestStatus: userRequestStatus,
    error: userProfileError
  } = useApiRequest({});
  const {
    run: runUserSuspend,
    data: userSuspendResponse,
    requestStatus: suspendStatus,
    error: userSuspendError
  } = useApiRequest({});
  const {
    run: runUserUnsuspend,
    data: userUnsuspendResponse,
    requestStatus: unsuspendStatus,
    error: userUnsuspendError
  } = useApiRequest({});
  const {
    run: runUserVerify,
    data: userVerifyResponse,
    requestStatus: userVerifyStatus,
    error: userVerifyError
  } = useApiRequest({});
  const {
    run: runBusinessVerify,
    data: businessVerifyResponse,
    requestStatus: businessVerifyStatus,
    error: businessVerifyError
  } = useApiRequest({});

  const [toast, setToast] = useState(false);
  const [toastHead, setToastHead] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const [userProperty, setUserProperty] = useState<UserPropertyTableItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const { id } = useParams();

  useMemo(() => {
    if (userSuspendResponse?.status === 204) {
      setToast(true);
      setToastHead("Success");
      setToastMessage("User Suspended!")
    } else if (userSuspendError) {
      setToast(true);
      setToastHead("Error");
      setToastMessage(userSuspendError)
    }
  }, [userSuspendResponse]);
  useMemo(() => {
    if (userUnsuspendResponse?.status === 204) {
      setToast(true);
      setToastHead("Success");
      setToastMessage("User Unsuspended!")
    } else if (userUnsuspendError) {
      setToast(true);
      setToastHead("Error");
      setToastMessage(userUnsuspendError)
    }
  }, [userUnsuspendResponse]);
  useMemo(() => {
    if (userVerifyResponse?.status === 204) {
      setToast(true);
      setToastHead("Success");
      setToastMessage("User Verified!")
    } else if (userVerifyError) {
      setToast(true);
      setToastHead("Error");
      setToastMessage(userVerifyError)
    }
  }, [userVerifyResponse]);
  useMemo(() => {
    if (businessVerifyResponse?.status === 204) {
      setToast(true);
      setToastHead("Success");
      setToastMessage("Business Verified!")
    } else if (businessVerifyError) {
      setToast(true);
      setToastHead("Error");
      setToastMessage(businessVerifyError)
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
    } else if (userProfileError) {
      setToast(true);
      setToastHead("Success");
      setToastMessage(userProfileError)
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
    } else if (userPropertyError) {
      setToast(true);
      setToastHead("Success");
      setToastMessage(userPropertyError);
    }
  }, [userPropertyDataResponse]);

  useEffect(() => {
    runUserProfileData(userProfileService(id));
    runUserPropertyData(userPropertyService(id));
  }, [id]);

  useEffect(() => {
    setLoading(
      userRequestStatus.isPending ||
        suspendStatus.isPending ||
        unsuspendStatus.isPending ||
        userVerifyStatus.isPending ||
        businessVerifyStatus.isPending ||
        userPropertyStatus.isPending
    );
  }, [
    userRequestStatus,
    unsuspendStatus,
    suspendStatus,
    userVerifyStatus,
    businessVerifyStatus,
    userPropertyStatus,
  ]);

  const handleView = (id) => navigate(Routes.property(id));
  const handleSuspend = (data: suspendData) => {
    runUserSuspend(userSuspendService(data))
      .then(() => {
        return runUserProfileData(userProfileService(id));
      })
      .catch((error) => {
        setToast(true);
        setToastHead("Error");
        setToastMessage(error);
      });
  };
  const handleUnsuspend = (data: unsuspendData) => {
    runUserUnsuspend(userUnsuspendService(data))
      .then(() => {
        return runUserProfileData(userProfileService(id));
      })
      .catch((error) => {
        setToast(true);
        setToastHead("Error");
        setToastMessage(error);
      });
  };
  const handleVerifyUser = (id) => {
    runUserVerify(userVerifyService(id))
      .then(() => {
        return runUserProfileData(userProfileService(id));
      })
      .catch((error) => {
        setToast(true);
        setToastHead("Error");
        setToastMessage(error);
      });
  };
  const handleVerifyBusiness = (id) => {
    runBusinessVerify(businessVerifyService(user?.businessID))
      .then(() => {
        return runUserProfileData(userProfileService(id));
      })
      .catch((error) => {
        setToast(true);
        setToastHead("Error");
        setToastMessage(error);
      });
  };

  const handlePages = (currentPage) => {
    setCurrentPage(currentPage);
  };
  const handleClose = () => {
    setToast(false);
  };
  const navigate = useNavigate();
  return (
    <>
      <Toast onClose={handleClose} loading={toast} head={toastHead} message={toastMessage} />
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
