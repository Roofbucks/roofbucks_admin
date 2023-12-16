import { fetchUserPropertiesService, fetchUserService } from "api";
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
          avatar: "",
          email: data.email,
          type: data.role.toLowerCase(),
          dateOfBirth: data.date_of_birth,
          address: data.address,
          city: data.city,
          country: data.country,
          phoneNumber: data.phone,
        },
        identification: {
          idType: data.identity_document_type
            .replaceAll("_", " ")
            .toLowerCase(),
          idNo: data.identity_document_number,
          expiration: data.identity_document_expiry_date,
          idFrontPage: "",
          idBackPage: "",
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
              }
            : undefined,
        billing: {
          bank: "",
          accountName: "",
          accountNumber: "",
          country: "",
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
        totalPages: propertiesResponse.data.pages,
        totalCount: propertiesResponse.data.total,
      }));

      return propertiesResponse.data.results.map((item) => ({
        propertyID: item.id,
        propertyName: item.name,
        status: item.moderation_status.toLowerCase(),
        date: new Date(item.created_at).toLocaleDateString(),
        amount: `NGN ${item.total_property_cost}`
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

  const handlePages = (page: number) => {
    fetchProperties(page);
    setPages((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const showLoader = fetchUserStatus.isPending || propertiesStatus.isPending;

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
        />
      ) : (
        ""
      )}
    </>
  );
};

export { UserProfile };
