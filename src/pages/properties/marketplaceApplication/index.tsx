import { MarketplaceApplicationUI } from "features";
import { useState } from "react";
import { ApproveMarketplaceApplication } from "../approveMarketplaceApplication";

const MarketplaceApplication = ({ show, close }) => {
  const [approve, setApprove] = useState(false);

  return (
    <>
      <ApproveMarketplaceApplication
        show={approve}
        close={() => setApprove(false)}
      />
      <MarketplaceApplicationUI
        approve={() => {
          close();
          setApprove(true);
        }}
        discard={console.log}
        show={show}
        close={close}
      />
    </>
  );
};

export { MarketplaceApplication };
