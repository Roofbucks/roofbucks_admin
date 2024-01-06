import { LoginUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { loginData, loginService } from "api";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Login = () => {
  const navigate = useNavigate();

  const { run: runLogin, data: loginResponse, error } = useApiRequest({});
  const login = (data: loginData) => {
    runLogin(loginService(data));
  }

  const forgot = () => {navigate(Routes.forgotPassword)}
  
  useMemo(() => {
    if (loginResponse?.status === 200) {
      localStorage.setItem("roofbucksAdminAccess", loginResponse.data.tokens.access);
      localStorage.setItem("roofbucksAdminRefresh", loginResponse.data.tokens.refresh);
      alert("Login Successful");
      navigate(Routes.users)
    } else if (error) {
      alert("Sorry, an error occured.");
    }
  }, [loginResponse, error, navigate])

  return (
    <>
      <LoginUI
        login={login}
        forgotPassword={forgot}
      />
    </>
  );
};

export { Login };