import { ForgotPasswordUI } from "features";

const ForgotPassword = () => {
  const login = () => {}
  const reset = () => {}
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
