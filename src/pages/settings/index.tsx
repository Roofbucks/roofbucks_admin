import { changePasswordService } from "api";
import { Preloader, Toast } from "components";
import { SettingsUI } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useState, useMemo } from "react";

const Settings = () => {
  // States
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });

  // API Hooks
  const {
    run: runPassword,
    data: passwordResponse,
    requestStatus: passwordStatus,
    error: passwordError,
  } = useApiRequest({});

  const handlePassword = (data) => runPassword(changePasswordService(data));

  useMemo(() => {
    if (passwordResponse?.status === 200) {
      setToast({
        show: true,
        text: passwordResponse.data.message ?? "Password reset successful",
        type: true,
      });

      setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 1500);
    } else if (passwordError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: passwordError,
          message: "Failed to change password, please try again later",
        }),
        type: false,
      });
    }
  }, [passwordResponse, passwordError]);

  const showLoader = passwordStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <SettingsUI handlePassword={handlePassword} reset={false} />
    </>
  );
};

export { Settings };
