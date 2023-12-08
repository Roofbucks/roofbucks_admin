import { resetPasswordService } from "api";
import { ResetData, ResetPasswordUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Routes } from "router";

const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = () => {navigate(Routes.home)};
  const token = searchParams.get('token');
  const uid64 = searchParams.get('uid64');
  const { run: runReset, data: ResetResponse, error } = useApiRequest({});
  const reset = (data: ResetData) => {
    token && uid64 && runReset(resetPasswordService({password: data.password, token, uid64}));
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
