import { PropertyUI } from "features";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApproveProperty } from "../approveProperty";
import { RejectProperty } from "../rejectProperty";
import { AddMarketValue } from "../addMarketValue";
import { UpdateRent } from "../updateRent";
import { useApiRequest } from "hooks";
import { fetchPropertyService } from "api";
import { getErrorMessage } from "helpers";

const Property = () => {
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [marketValue, setMarketValue] = useState(false);
  const [rent, setRent] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });

  const navigate = useNavigate();
  const { id: propertyID } = useParams();

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});

  const fetchProperty = () =>
    propertyID && runFetch(fetchPropertyService(propertyID));

  useEffect(() => {
    fetchProperty();
  }, [propertyID]);

  const property = useMemo(() => {
    if (fetchResponse?.status === 200) {
      console.log(fetchResponse);
    } else if (fetchError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchError,
          message: "Failed to fetch property, please try again later",
        }),
        type: false,
      });
    }
  }, [fetchResponse, fetchError]);

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
