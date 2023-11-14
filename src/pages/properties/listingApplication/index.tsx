import { ListingApplicationUI } from "features";
import { useState } from "react";
import { ApproveListingApplication } from "../approveListingApplication";

const ListingApplication = ({ show, close, callback }) => {
  const [approve, setApprove] = useState(false);

  return (
    <>
      <ApproveListingApplication
        show={approve}
        close={() => setApprove(false)}
      />
      <ListingApplicationUI
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

export { ListingApplication };
