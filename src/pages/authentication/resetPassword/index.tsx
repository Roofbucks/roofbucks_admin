import { resetPasswordData, resetPasswordService } from "api";
import { ResetPasswordUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const ResetPassword = () => {
  const login = () => { }

  const navigate = useNavigate();
  const { run: runReset, data: ResetResponse, error } = useApiRequest({});
  const reset = (data: resetPasswordData) => {
    runReset(resetPasswordService(data))
  }

  useMemo(() => {
    if (ResetResponse?.status === 200) {
      localStorage.setItem("roofbucksAdminAccess", ResetResponse.tokens);
      alert("You have successfully reset your password.");
      navigate(Routes.home)
    } else if (error) {
      alert("Failed to reset password, please try again later.");
    }
  }, [ResetResponse, error, navigate])
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
