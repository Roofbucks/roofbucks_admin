import { fetchApplicationService, discardApplicationService } from "api";
import { Preloader, Toast, ConfirmationModal } from "components";
import { MarketplaceApplicationData, MarketplaceApplicationUI } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";

interface Props {
  show: boolean;
  close: () => void;
  callback: () => void;
  id: string;
}

const MarketplaceApplication: React.FC<Props> = ({
  show,
  close,
  id,
  callback,
}) => {
  // States
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });
  const [discard, setDiscard] = useState(false);

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});
  const {
    run: runDiscard,
    data: discardResponse,
    requestStatus: discardStatus,
    error: discardError,
  } = useApiRequest({});

  const fetchApplication = () => runFetch(fetchApplicationService(id));
  const handleDiscard = () => runDiscard(discardApplicationService(id));
  console.log(id);
  useEffect(() => {
    show && fetchApplication();
  }, [id, show]);

  const application = useMemo<MarketplaceApplicationData | undefined>(() => {
    if (fetchResponse?.status === 200) {
      console.log(fetchResponse);
      const data = fetchResponse.data;

      return {
        property: {
          id: data.property_id,
          name: data.property_name,
          agent: data.agent_name,
          cost: data.total_cost,
          completionStatus: data.completion_status.toLowerCase(),
        },
        applicant: {
          id: data.id,
          name: data.applicant_name,
          email: data.applicant_email,
          socialMedia: data.percentage,
          location: `${data.applicant_city}, ${data.applicant_country}`,
          percentage: data.percentage_ownership,
          amount: (data.total_cost * data.percentage_ownership) / 100,
          focus: "",
          investorType: "",
          timeline: "",
          roi: data.expected_ROI,
        },
      };
    } else if (fetchError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchError,
          message: "Failed to fetch application, please try again later",
        }),
        type: false,
      });
    }
    return undefined;
  }, [fetchResponse, fetchError]);

  useMemo(() => {
    if (discardResponse?.status === 204) {
      setToast({
        show: true,
        text:
          discardResponse.data?.message ?? "Successfully discarded application",
        type: false,
      });
      callback();
      setDiscard(false);
      setTimeout(() => {
        close();
        setToast({ ...toast, show: false });
      }, 1000);
    } else if (discardError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: discardError,
          message: "Failed to discard application, please try again later",
        }),
        type: false,
      });
    }
  }, [discardResponse, discardError]);

  const loading = fetchStatus.isPending || discardStatus.isPending;

  return (
    <>
      <Preloader loading={loading} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <ConfirmationModal
        show={discard}
        close={() => setDiscard(false)}
        text={`Are you sure you want to discard this application?`}
        submit={handleDiscard}
      />
      {application ? (
        <MarketplaceApplicationUI
          discard={() => setDiscard(true)}
          show={show}
          close={close}
          application={application}
        />
      ) : (
        ""
      )}
    </>
  );
};

export { MarketplaceApplication };
