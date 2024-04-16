import { forgotPasswordData, forgotPasswordService } from "api";
import { Toast } from "components";
import { ForgotPasswordUI, RecoveryData } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [toastHead, setToastHead] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const { run: runRecovery, data: recoveryResponse, error } = useApiRequest({});

  const reset = (data: RecoveryData) => {
    const defaultRedirectURL = "http://localhost:3000/reset-password/";
    const requestData = { ...data, redirect_url: defaultRedirectURL };
    runRecovery(forgotPasswordService(requestData));
  };

  useMemo(() => {
    if (recoveryResponse?.status === 200) {
      setToast(true);
      setToastHead("Success");
      setToastMessage("Check your email for instructions!")
    } else if (error) {
      setToast(true);
      setToastHead("Error");
      setToastMessage(error)
    }
  }, [error, recoveryResponse]);

  const login = () => {
    navigate(Routes.home);
  };
  const handleClose = () => {
    setToast(false);
  };
  return (
    <>
      <Toast onClose={handleClose} loading={toast} head={toastHead} message={toastMessage} />
      <ForgotPasswordUI login={login} recovery={reset} clear />
    </>
  );
};

export { ForgotPassword };
