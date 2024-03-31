import {
  fetchUserProfileService,
  settingsAccountData,
  settingsAccountService,
  settingsSecurityData,
  settingsSecurityService,
} from "api";
import { Preloader } from "components";
import { AccountData, SettingsUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";

const Settings = () => {
  const {
    run: runuserSecurityData,
    data: userSecurityResponse,
    requestStatus: userSecurityRequestStatus
  } = useApiRequest({});
  const {
    run: runUserProfileData,
    data: userProfileDataResponse,
    requestStatus: userProfileRequestStatus
  } =  useApiRequest({});
  const {
    run: runAccountData,
    data: userAccountDataResponse,
    requestStatus: userAccountDataStatus
  } = useApiRequest(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<AccountData>({
    firstName: "",
    lastName: "",
  });
  const securitySettings = (data: settingsSecurityData) => {
    runuserSecurityData(settingsSecurityService(data));
  };
  const accountSettings = (data: settingsAccountData) => {
    runAccountData(settingsAccountService(data));
  };

  useMemo(() => {
    if (userSecurityResponse?.status === 200) {
      alert("Password Changed!");
    } else if (userSecurityResponse?.status === 404) {
      alert("Sorry, an error occured.");
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
    } else if (userProfileDataResponse?.status === 404) {
    }
  }, [userProfileDataResponse]);

  useMemo(() => {
    if (userAccountDataResponse?.status === 200) {
      alert("Name Changed!");
    } else if (userAccountDataResponse?.status === 404) {
      alert("Sorry, an error occured.");
    }
  }, [userAccountDataResponse]);

  useEffect(() => {
    runUserProfileData(fetchUserProfileService());
  }, []);

  useEffect(() => {
    setLoading(
      userSecurityRequestStatus.isPending ||
      userProfileRequestStatus.isPending ||
      userAccountDataStatus.isPending
    )
  }, [
    userAccountDataStatus,
    userProfileRequestStatus,
    userSecurityRequestStatus
  ])
  return (
    <>
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
