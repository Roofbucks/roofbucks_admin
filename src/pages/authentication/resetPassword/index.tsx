import { ResetPasswordUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { resetPasswordRequestData, resetPasswordService } from "api";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const ResetPassword = () => {
  const navigate = useNavigate();

  const { run: runPasswordReset, data: resetPasswordResponse, requestStatus, error } = useApiRequest({});

  const login = () => {}
  const reset = () => {}
  return (
    <>
      <ResetPasswordUI
        login={login}
        reset={reset}
      />
    </>
  );
};

export { ResetPassword };
