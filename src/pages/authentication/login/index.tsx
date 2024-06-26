import { loginService } from "api";
import { Preloader, Toast } from "components";
import { LoginUI } from "features";
import { getErrorMessage } from "helpers";
import { useGetUser } from "hooks";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Login = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });

  const {
    run: runLogin,
    data: loginResponse,
    requestStatus,
    error,
  } = useApiRequest({});

  useMemo(() => {
    if (loginResponse?.status === 200) {
      const data = loginResponse.data;

      if (!data.is_staff)
        return setToast({
          show: true,
          text: "Failed to verify you as an admin",
          type: false,
        });

      localStorage.setItem("roofbucksAdminAccess", data.tokens.access);
      localStorage.setItem("roofbucksAdminRefresh", data.tokens.refresh);

      setToast({
        show: true,
        text: "Login successful",
        type: true,
      });
      setTimeout(() => {
        navigate(Routes.users);
      }, 1000);
    } else if (error) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: error,
          message: "Login failed, please try again later",
        }),
        type: false,
      });
    }
  }, [loginResponse, error]);

  const login = (data) => {
    runLogin(loginService(data));
  };
  const forgot = () => {
    navigate(Routes.forgotPassword);
  };

  const showLoader = requestStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <LoginUI login={login} forgotPassword={forgot} />
    </>
  );
};

export { Login };
