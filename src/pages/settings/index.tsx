import { changePasswordService, editNameService } from "api";
import { Preloader, Toast } from "components";
import { SettingsUI } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest, useGetUser } from "hooks";
import { useState, useMemo, useEffect } from "react";
import { useAppSelector } from "state/hooks";

const Settings = () => {
  // States
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });

  const { fetchUser, loading } = useGetUser();
  const { firstName, lastName } = useAppSelector((state) => state.user);

  // API Hooks
  const {
    run: runPassword,
    data: passwordResponse,
    requestStatus: passwordStatus,
    error: passwordError,
  } = useApiRequest({});
  const {
    run: runProfile,
    data: profileResponse,
    requestStatus: profileStatus,
    error: profileError,
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

  const handleProfile = (data) => runProfile(editNameService(data));

  useMemo(() => {
    if (profileResponse?.status === 200) {
      setToast({
        show: true,
        text: profileResponse.data.message ?? "Profile updated successfully!",
        type: true,
      });
      fetchUser();
      setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 1500);
    } else if (profileError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: profileError,
          message: "Failed to edit profile, please try again later",
        }),
        type: false,
      });
    }
  }, [profileResponse, profileError]);

  const showLoader =
    passwordStatus.isPending || profileStatus.isPending || loading;

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <SettingsUI
        handlePassword={handlePassword}
        handleProfile={handleProfile}
        init={{ firstName, lastName }}
      />
    </>
  );
};

export { Settings };
