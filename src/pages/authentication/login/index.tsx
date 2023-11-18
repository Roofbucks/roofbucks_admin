import { LoginUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { loginRequestData, loginService } from "api";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Login = () => {
  const navigate = useNavigate();
  const { run: runLogin, data: loginResponse, error } = useApiRequest({});
  const login = (data: loginRequestData) => {
    runLogin(loginService(data));
  }
  const forgot = () => { }
  
  useMemo(() => {
    if (loginResponse?.status === 200) {
      alert("Login Successful");
      navigate(Routes.users)
    } else if (error) {
      alert("Sorry, an error occured");
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