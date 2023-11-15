import { SettingsUI } from "features";

const Settings = () => {
  return (
    <>
      <SettingsUI
        submitPassword={console.log}
        reset={false}
      />
    </>
  );
};

export { Settings };
