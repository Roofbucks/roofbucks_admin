import { TeamUI } from "features";

const Team = () => {
  return (
    <>
      <TeamUI
        handleInvite={console.log}
        handleResendInvite={console.log}
        handleRevokeInvite={console.log}
      />
    </>
  );
};

export { Team };
