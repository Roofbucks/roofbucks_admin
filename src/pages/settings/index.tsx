import {
  fetchUserProfileService,
  settingsAccountData,
  settingsAccountService,
  settingsSecurityData,
  settingsSecurityService,
} from "api";
import { Preloader, Toast } from "components";
import { AccountData, SettingsUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";

const Settings = () => {
  const {
    run: runuserSecurityData,
    data: userSecurityResponse,
    requestStatus: userSecurityStatus,
    error: userSecurityError
  } = useApiRequest({});
  const {
    run: runUserProfileData,
    data: userProfileDataResponse,
    requestStatus: userProfileStatus,
    error: userProfileError
  } =  useApiRequest({});
  const {
    run: runAccountData,
    data: userAccountDataResponse,
    requestStatus: userAccountDataStatus,
    error: userAccountError
  } = useApiRequest(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastHead, setToastHead] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [name, setName] = useState<AccountData>({
    firstName: "",
    lastName: "",
  });
  const securitySettings = (data: settingsSecurityData) => {
    runuserSecurityData(settingsSecurityService(data));
  };
  const accountSettings = (data: settingsAccountData) => {
    runAccountData(settingsAccountService(data))
      .then(() => {
        runUserProfileData(fetchUserProfileService());
      })
      .catch((error) => {

      })
    
  };

  useMemo(() => {
    if (userSecurityResponse?.status === 200) {
      setToast(true);
      setToastHead("Success");
      setToastMessage("Password Changed!")
    } else if (userSecurityError) {
      alert("Sorry, an error occured.");
      setToast(true);
      setToastHead("Error");
      setToastMessage(userSecurityError)
    }
  }, [userSecurityResponse]);

  useMemo(() => {
    if (userProfileDataResponse?.status === 200) {
      const userProfile = userProfileDataResponse.data;
      const ProfileData = {
        firstName: userProfile.firstname,
        lastName: userProfile.lastname,
      };
      setName(ProfileData);
    } else if (userProfileError) {
    }
  }, [userProfileDataResponse]);

  useMemo(() => {
    if (userAccountDataResponse?.status === 200) {
      setToast(true);
      setToastHead("Success");
      setToastMessage("Name changed!")
    } else if (userAccountError) {
      setToast(true);
      setToastHead("Success");
      setToastMessage(userAccountError)
    }
  }, [userAccountDataResponse]);

  useEffect(() => {
    runUserProfileData(fetchUserProfileService());
  }, []);

  useEffect(() => {
    setLoading(
      userSecurityStatus.isPending ||
      userProfileStatus.isPending ||
      userAccountDataStatus.isPending
    )
  }, [
    userAccountDataStatus,
    userProfileStatus,
    userSecurityStatus
  ]);

  const handleClose = () => {
    setToast(false);
  };
  return (
    <>
      <Toast onClose={handleClose} loading={toast} head={toastHead} message={toastMessage} />
      <Preloader loading={loading} />
      <SettingsUI
        submitPassword={securitySettings}
        reset={false}
        account={name}
        updateName={accountSettings}
      />
    </>
  );
};

export { Settings };
