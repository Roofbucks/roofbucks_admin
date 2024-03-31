import { forgotPasswordData, forgotPasswordService } from "api";
import { ForgotPasswordUI, RecoveryData } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { run: runRecovery, data: recoveryResponse, error } = useApiRequest({});

  const reset = (data: RecoveryData) => {
    const defaultRedirectURL = "http://localhost:3000/reset-password/";
    const requestData = { ...data, redirect_url: defaultRedirectURL };
    runRecovery(forgotPasswordService(requestData));
  };

  useMemo(() => {
    if (recoveryResponse?.status === 200) {
      alert("Check your email for instructions!");
    } else if (error) {
      alert("Sorry, an error occured");
    }
  }, [error, recoveryResponse]);

  const login = () => {
    navigate(Routes.home);
  };
  return (
    <>
      <ForgotPasswordUI login={login} recovery={reset} clear />
    </>
  );
};

export { ForgotPassword };
