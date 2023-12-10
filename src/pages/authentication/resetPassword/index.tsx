import { resetPasswordService } from "api";
import { ResetData, ResetPasswordUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Routes } from "router";

const ResetPassword = () => {
  const login = () => {
    navigate(Routes.home);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const uid64 = searchParams.get('uid64');
  
  const navigate = useNavigate();
  const { run: runReset, data: ResetResponse, error } = useApiRequest({});
  const reset = (data: ResetData) => {
    if (token && uid64) {
      runReset(resetPasswordService({password: data.password, token, uid64}));
    }
  };

  useMemo(() => {
    if (ResetResponse?.status === 200) {
      alert("You have successfully reset your password.");
      navigate(Routes.home);
    } else if (error) {
      alert("Failed to reset password, please try again later.");
    }
  }, [ResetResponse, error, navigate]);
  return (
    <>
      <ResetPasswordUI login={login} reset={reset} />
    </>
  );
};

export { ResetPassword };