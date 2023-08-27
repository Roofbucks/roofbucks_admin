import { LoginUI } from "features";

const Login = () => {
  const login = () => {}
  const forgot = () => {}
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
