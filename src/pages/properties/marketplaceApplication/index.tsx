import { MarketplaceApplicationUI } from "features";

const MarketplaceApplication = ({ show, close }) => {
  return (
    <>
      <MarketplaceApplicationUI show={show} close={close} />
    </>
  );
};

export { MarketplaceApplication };
