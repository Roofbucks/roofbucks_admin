import { PropertyUI } from "features";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApproveProperty } from "../approveProperty";
import { RejectProperty } from "../rejectProperty";
import { AddMarketValue } from "../addMarketValue";
import { UpdateRent } from "../updateRent";

const Property = () => {
  const navigate = useNavigate();
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [marketValue, setMarketValue] = useState(false);
  const [rent, setRent] = useState(false);

  const goBack = () => navigate(-1);

  return (
    <>
      <ApproveProperty show={approve} close={() => setApprove(false)} />
      <RejectProperty show={reject} close={() => setReject(false)} />
      <AddMarketValue show={marketValue} close={() => setMarketValue(false)} />
      <UpdateRent show={rent} close={() => setRent(false)} />
      <PropertyUI
        goBack={goBack}
        handleApprove={() => setApprove(true)}
        handleReject={() => setReject(true)}
        handleMarketValue={() => setMarketValue(true)}
        handleRent={() => setRent(true)}
      />
    </>
  );
};

export { Property };
