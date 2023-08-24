import { LoginUI } from "features";

const Login = () => {
  const login = () => {}
  const forgot = () => {}
  const signup = () => {}
  return (
    <>
      <LoginUI
        login={login}
        forgotPassword={forgot}
        signup={signup}
      />
    </>
  );
};

export { Login };
