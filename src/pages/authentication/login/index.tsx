import { LoginUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { loginData, loginService } from "api";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { Toast } from "components";

const Login = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [toastHead, setToastHead] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const { run: runLogin, data: loginResponse, error } = useApiRequest({});
  const login = (data: loginData) => {
    runLogin(loginService(data));
  }

  const forgot = () => {navigate(Routes.forgotPassword)}
  
  useMemo(() => {
    if (loginResponse?.status === 200) {
      localStorage.setItem("roofbucksAdminAccess", loginResponse.data.tokens.access);
      localStorage.setItem("roofbucksAdminRefresh", loginResponse.data.tokens.refresh)
      setToast(true);
      setToastHead("Success");
      setToastMessage("Login Successful!");
      setTimeout(() => {
        navigate(Routes.users);
      }, 2000);
    } else if (error) {
      setToast(true);
      setToastHead("Error");
      setToastMessage(error);
    }
  }, [loginResponse, error, navigate])

  const handleClose = () => {
    setToast(false);
  };

  return (
    <>
      <Toast onClose={handleClose} loading={toast} head={toastHead} message={toastMessage} />
      <LoginUI
        login={login}
        forgotPassword={forgot}
      />
    </>
  );
};

export { Login };