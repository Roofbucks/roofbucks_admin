import { newPasswordService } from "api";
import { Preloader, Toast } from "components";
import { ResetPasswordUI } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks/useApiRequest";
import { useState, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Routes } from "router";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });
  const params = useParams();
  const [searchParams] = useSearchParams();

  const uid = searchParams.get("uid64");
  const token = searchParams.get("token");

  console.log(searchParams);

  const {
    run: runReset,
    data: resetResponse,
    requestStatus,
    error,
  } = useApiRequest({});

  useMemo(() => {
    if (resetResponse?.status === 200) {
      setToast({
        show: true,
        text:
          resetResponse.data.message ??
          "You've successfully reset your password. Redirecting to login in 3..2..1..",
        type: true,
      });

      setTimeout(() => {
        navigate(Routes.home);
      }, 2000);
    } else if (error) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: error,
          message: "Password reset failed, please try again later",
        }),
        type: false,
      });
    }
  }, [resetResponse, error]);

  const showLoader = requestStatus.isPending;

  const reset = (data) => {
    uid &&
      token &&
      runReset(
        newPasswordService({
          uid64: uid,
          token: token,
          password: data.password,
        })
      );
  };

  const login = () => {
    navigate(Routes.home);
  };

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <ResetPasswordUI login={login} reset={reset} />
    </>
  );
};

export { ResetPassword };
