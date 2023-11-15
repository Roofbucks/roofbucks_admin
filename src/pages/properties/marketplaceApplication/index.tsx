import { MarketplaceApplicationUI } from "features";
import { useState } from "react";

const MarketplaceApplication = ({ show, close }) => {
  return (
    <>
      <MarketplaceApplicationUI
        discard={console.log}
        show={show}
        close={close}
      />
    </>
  );
};

export { MarketplaceApplication };
