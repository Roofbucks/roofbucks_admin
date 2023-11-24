import { ForgotPasswordUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { forgotPasswordRequestData, forgotPasswordService } from "api";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";


const ForgotPassword = () => {
  const login = () => {}

  const navigate = useNavigate();
  const { run: runforgotPassword, data: forgotPasswordResponse, error } = useApiRequest({});
 
   const reset = (data: forgotPasswordRequestData) => {
     runforgotPassword(forgotPasswordService(data));
   };
  useMemo(() => {
    if (forgotPasswordResponse?.status === 200) {
      alert("Follow the instructions sent to your email");
      navigate(Routes.resetPassword);
    } else if (error) {
      alert("Failed to send instructions for the password reset, please try again later")
    }
  }, [forgotPasswordResponse, error, navigate])
  return (
    <>
      <ForgotPasswordUI
        login={login}
        recovery={reset}
        clear
      />
    </>
  );
};

export { ForgotPassword };
