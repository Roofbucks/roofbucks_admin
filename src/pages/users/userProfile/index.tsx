import {
  approveCompanyService,
  fetchUserPropertiesService,
  fetchUserService,
  suspendUserService,
  unsuspendUserService,
} from "api";
import { Preloader, Toast, UserPropertyTableItem } from "components";
import { UserProfileData, UserProfileUI } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router";

const UserProfile = () => {
  const navigate = useNavigate();
  // States
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });
  const params = useParams();

  // API Hooks
  const {
    run: runFetchUser,
    data: fetchUserResponse,
    requestStatus: fetchUserStatus,
    error: fetchUserError,
  } = useApiRequest({});
  const {
    run: runProperties,
    data: propertiesResponse,
    requestStatus: propertiesStatus,
    error: propertiesError,
  } = useApiRequest({});
  const {
    run: runApproveBusiness,
    data: approveBusinessResponse,
    requestStatus: approveBusinessStatus,
    error: approveBusinessError,
  } = useApiRequest({});
  const {
    run: runSuspend,
    data: suspendResponse,
    requestStatus: suspendStatus,
    error: suspendError,
  } = useApiRequest({});
  const {
    run: runUnsuspend,
    data: unsuspendResponse,
    requestStatus: unsuspendStatus,
    error: unsuspendError,
  } = useApiRequest({});

  const fetchUser = () =>
    params.id && runFetchUser(fetchUserService(params.id));

  const fetchProperties = (page?) =>
    params.id &&
    runProperties(
      fetchUserPropertiesService(params.id, {
        page: page ?? pages.currentPage,
        limit: pages.pageLimit,
      })
    );
  useEffect(() => {
    fetchUser();
    fetchProperties(1);
  }, []);

  const user = useMemo<UserProfileData | undefined>(() => {
    if (fetchUserResponse?.status === 200) {
      const data = fetchUserResponse.data;
      return {
        personal: {
          firstName: data.firstname,
          lastName: data.lastname,
          avatar: data.display_photo,
          email: data.email,
          type: data.role.toLowerCase(),
          dateOfBirth: data.date_of_birth,
          address: data.address,
          city: data.city,
          country: data.country,
          phoneNumber: data.phone,
          status: data.status.toLowerCase(),
        },
        identification: {
          idType: data.identity_document_type
            .replaceAll("_", " ")
            .toLowerCase(),
          idNo: data.identity_document_number,
          expiration: data.identity_document_expiry_date,
          idFrontPage: data.identity_document_album
            ? data.identity_document_album[0].document
            : undefined,
          idBackPage: data.identity_document_album
            ? data.identity_document_album[1].document
            : undefined,
          proofOfAddress: "",
        },
        business:
          data.role === "AGENT"
            ? {
                companyName: data.business_info.registered_name,
                logo: data.business_info.company_logo,
                regNo: data.business_info.registration_number,
                email: data.business_info.email,
                city: data.business_info.city,
                description: data.business_info.description,
                country: data.business_info.country,
                certOfInc: data.business_info.certificate_of_incorporation,
                isVerified: data.business_info.is_verified,
                id: data.business_info.id,
              }
            : undefined,
        billing: {
          bank: data.bank_information[0]
            ? data.bank_information[0].bank_name
            : undefined,
          accountName: data.bank_information[0]
            ? data.bank_information[0].account_name
            : undefined,
          accountNumber: data.bank_information[0]
            ? data.bank_information[0].account_number
            : undefined,
          country: data.bank_information[0]
            ? data.bank_information[0].country
            : undefined,
        },
      };
    } else if (fetchUserError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchUserError,
          message: "Failed to fetch user profile, please try again later",
        }),
        type: false,
      });
    }
    return undefined;
  }, [fetchUserResponse, fetchUserError]);

  const properties = useMemo<UserPropertyTableItem[]>(() => {
    if (propertiesResponse?.status === 200) {
      const data = propertiesResponse.data;
      setPages((prev) => ({
        ...prev,
        totalPages: data.pages,
        totalCount: data.total,
      }));

      return data.results.map((item) => ({
        propertyID: item.id,
        propertyName: item.name,
        status: item.moderation_status.toLowerCase(),
        date: new Date(item.created_at).toLocaleDateString(),
        amount: `NGN ${item.total_property_cost}`,
      }));
    } else if (propertiesError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: propertiesError,
          message: "Failed to fetch user properties, please try again later",
        }),
        type: false,
      });
    }
    return [];
  }, [propertiesResponse, propertiesError]);

  const handleView = (id) => navigate(Routes.property(id));

  const handleApproveBusiness = () => {
    user?.business?.id &&
      runApproveBusiness(approveCompanyService(user.business.id));
  };

  useMemo(() => {
    if (approveBusinessResponse?.status === 200) {
      fetchUser();
      setToast({
        show: true,
        text: "Approval successful!",
        type: true,
      });

      setTimeout(() => {
        setToast({
          show: false,
          text: "",
          type: true,
        });
      }, 2000);
    } else if (approveBusinessError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: approveBusinessError,
          message: "Failed to approve business, please try again later",
        }),
        type: false,
      });
    }
    return [];
  }, [approveBusinessResponse, approveBusinessError]);

  const handleSuspendUser = () => {
    user?.personal.email &&
      runSuspend(suspendUserService(user?.personal.email));
  };

  const handleUnsuspendUser = () => {
    user?.personal.email &&
      runUnsuspend(unsuspendUserService(user?.personal.email));
  };

  useMemo(() => {
    if (suspendResponse?.status === 204) {
      fetchUser();
      setToast({
        show: true,
        text: "Account suspension successful!",
        type: true,
      });

      setTimeout(() => {
        setToast({
          show: false,
          text: "",
          type: true,
        });
      }, 2000);
    } else if (suspendError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: suspendError,
          message: "Failed to suspend account, please try again later",
        }),
        type: false,
      });
    }
    return [];
  }, [suspendResponse, suspendError]);

  useMemo(() => {
    if (unsuspendResponse?.status === 204) {
      fetchUser();
      setToast({
        show: true,
        text: "Successfully unsuspended account!",
        type: true,
      });

      setTimeout(() => {
        setToast({
          show: false,
          text: "",
          type: true,
        });
      }, 2000);
    } else if (unsuspendError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: unsuspendError,
          message: "Failed to unsuspend account, please try again later",
        }),
        type: false,
      });
    }
    return [];
  }, [unsuspendResponse, unsuspendError]);

  const handlePages = (page: number) => {
    fetchProperties(page);
    setPages((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const showLoader =
    fetchUserStatus.isPending ||
    propertiesStatus.isPending ||
    approveBusinessStatus.isPending ||
    suspendStatus.isPending ||
    unsuspendStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      {user ? (
        <UserProfileUI
          handleView={handleView}
          user={user}
          properties={properties}
          pagination={{ ...pages, handleChange: handlePages }}
          handleBack={() => navigate(-1)}
          handleApproveBusiness={handleApproveBusiness}
          handleSuspendUser={handleSuspendUser}
          handleUnsuspendUser={handleUnsuspendUser}
        />
      ) : (
        ""
      )}
    </>
  );
};

export { UserProfile };
