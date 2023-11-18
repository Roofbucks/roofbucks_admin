import { clear } from "@testing-library/user-event/dist/clear";
import { resetPasswordService } from "api";
import { Preloader, Toast } from "components";
import { ForgotPasswordUI } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks/useApiRequest";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });
  const [clear, setClear] = useState(false);

  const {
    run: runReset,
    data: resetResponse,
    requestStatus,
    error,
  } = useApiRequest({});

  const login = () => {
    navigate(Routes.home);
  };
  const reset = (data) => {
    runReset(resetPasswordService(data));
  };

  useMemo(() => {
    if (resetResponse?.status === 200) {
      setToast({
        show: true,
        text:
          resetResponse.data.message ??
          "If you have an account with us, a link to reset your password has been sent to your email",
        type: true,
      });

      setClear(!clear);
    } else if (error) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: error,
          message:
            "Failed to request for a password reset, please try again later",
        }),
        type: false,
      });
    }
  }, [resetResponse, error]);

  const showLoader = requestStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <ForgotPasswordUI login={login} recovery={reset} clear={clear} />
    </>
  );
};

export { ForgotPassword };
