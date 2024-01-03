import { fetchApplicationService } from "api";
import { Preloader, Toast } from "components";
import { ListingApplicationData, ListingApplicationUI } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useEffect, useMemo, useState } from "react";

interface Props {
  show: boolean;
  close: () => void;
  callback: () => void;
  id: string;
}

const ListingApplication: React.FC<Props> = ({ show, close, callback, id }) => {
  // States
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});

  const fetchApplication = () => runFetch(fetchApplicationService(id));

  useEffect(() => {
    show && fetchApplication();
  }, [id, show]);

  const application = useMemo<ListingApplicationData | undefined>(() => {
    if (fetchResponse?.status === 200) {
      console.log(fetchResponse);
      const data = fetchResponse.data;

      return {
        property: {
          id: data.property_id,
          name: data.property_name,
          agent: data.agent_name,
          cost: `NGN ${data.total_cost}`,
          completionStatus: data.completion_status.toLowerCase(),
        },
        applicant: {
          id: data.id,
          name: data.applicant_name,
          email: data.applicant_email,
          socialMedia: "",
          location: `${data.applicant_city}, ${data.applicant_country}`,
          percentage: data.percentage_ownership,
          amount: `NGN ${(data.total_cost * data.percentage_ownership) / 100}`,
          duration: "",
          longTermOwnership: "",
          reason: "",
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

  const loading = fetchStatus.isPending;

  return (
    <>
      <Preloader loading={loading} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      {application && (
        <ListingApplicationUI
          application={application}
          discard={console.log}
          show={show}
          close={close}
        />
      )}
    </>
  );
};

export { ListingApplication };
