import { fetchUsersService, resendMailService } from "api";
import { Preloader, Toast, UserTableItem } from "components";
import { UsersUI } from "features";
import { getErrorMessage } from "helpers";
import { useDebounce, useApiRequest } from "hooks";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { optionType } from "types";

const Users = () => {
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
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<optionType | undefined>(undefined);
  const [status, setStatus] = useState<optionType | undefined>(undefined);

  const debouncedSearchTerm = useDebounce(search, 500);
  const navigate = useNavigate();
  const handleView = (id) => navigate(Routes.user(id));

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});
  const {
    run: runResend,
    data: resendResponse,
    requestStatus: resendStatus,
    error: resendError,
  } = useApiRequest({});

  const fetchUsers = (page?) => {
    runFetch(
      fetchUsersService({
        page: page ?? pages.currentPage,
        limit: pages.pageLimit,
        search,
        status: status?.value,
        role: role?.value,
      })
    );
  };

  useEffect(() => {
    fetchUsers(1);
    setPages((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  }, [debouncedSearchTerm, role, status]);

  const users = useMemo<UserTableItem[]>(() => {
    if (fetchResponse?.status === 200) {
      console.log(fetchResponse);
      setPages((prev) => ({
        ...prev,
        totalPages: fetchResponse.data.pages,
        totalCount: fetchResponse.data.total,
      }));

      return fetchResponse.data.results.map((item) => ({
        id: item.id,
        name: `${item.firstname} ${item.lastname}`,
        email: item.email,
        type: item.role.toLowerCase(),
        dateCreated: new Date(item.created_at).toLocaleDateString(),
        status: item.status.toLowerCase(),
        verifiedBusiness: item.business_verified,
      }));
    } else if (fetchError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchError,
          message: "Failed to fetch members, please try again later",
        }),
        type: false,
      });
    }
    return [];
  }, [fetchResponse, fetchError]);

  const handlePages = (page: number) => {
    fetchUsers(page);
    setPages((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleResend = (email) => {
    runResend(resendMailService({email}));
  };

  useMemo(() => {
    if (resendResponse?.status === 200) {
      setToast({
        show: true,
        text:
          resendResponse.data.message ??
          "Successfully resent verification mail!",
        type: true,
      });

      setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 2500);
    } else if (resendError) {
      console.log(resendError)
      setToast({
        show: true,
        text: getErrorMessage({
          error: resendError,
          message: "Failed to resend verification mail, please try again later",
        }),
        type: false,
      });
    }
  }, [resendResponse, resendError]);

  const showLoader = fetchStatus.isPending || resendStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <UsersUI
        handleView={handleView}
        users={users}
        pagination={{ ...pages, handleChange: handlePages }}
        search={{
          value: search,
          handleChange: setSearch,
        }}
        accountType={{
          value: role,
          handleChange: setRole,
        }}
        status={{
          value: status,
          handleChange: setStatus,
        }}
        handleResendMail={handleResend}
      />
    </>
  );
};

export { Users };
