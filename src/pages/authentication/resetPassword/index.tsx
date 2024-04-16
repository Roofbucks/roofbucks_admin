import { resetPasswordService } from "api";
import { Toast } from "components";
import { ResetData, ResetPasswordUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Routes } from "router";

const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [toastHead, setToastHead] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const login = () => {navigate(Routes.home)};
  const token = searchParams.get('token');
  const uid64 = searchParams.get('uid64');
  const { run: runReset, data: ResetResponse, error } = useApiRequest({});
  const reset = (data: ResetData) => {
    token && uid64 && runReset(resetPasswordService({password: data.password, token, uid64}));
  };

  useMemo(() => {
    if (ResetResponse?.status === 200) {
      setToast(true);
      setToastHead("Success");
      setToastMessage("You have successfully reset your password.");
      setTimeout(() => {
        navigate(Routes.home);
      }, 2000);
    } else if (error) {
      setToast(true);
      setToastHead("Error");
      setToastMessage(error);
    }
  }, [ResetResponse, error, navigate]);

  const handleClose = () => {
    setToast(false);
  };
  return (
    <>
      <Toast onClose={handleClose} loading={toast} head={toastHead} message={toastMessage} />
      <ResetPasswordUI login={login} reset={reset} />
    </>
  );
};

export { ResetPassword };
