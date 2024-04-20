import { rejectPropertyService, suspendPropertyService } from "api";
import { Preloader, Toast } from "components";
import { RejectPropertyModal, SuspendPropertyModal } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useState, useMemo } from "react";

interface SuspendPropertyProps {
  show: boolean;
  close: () => void;
  propertyID: string;
  callback: () => void;
}

const SuspendProperty: React.FC<SuspendPropertyProps> = ({
  show,
  close,
  propertyID,
  callback,
}) => {
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });

  // API Hooks
  const { run, data: response, requestStatus, error } = useApiRequest({});

  const handleSuspend = (reason) =>
    run(suspendPropertyService({ id: propertyID, reason }));

  useMemo(() => {
    if (response?.status === 204) {
      setToast({
        show: true,
        text: response.data.message ?? "Successfully suspended property",
        type: true,
      });
      callback();
      close();
    } else if (error) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: error,
          message: "Failed to suspend property, please try again later",
        }),
        type: false,
      });
    }
  }, [response, error]);

  const showLoader = requestStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <SuspendPropertyModal
        show={show}
        close={close}
        submit={(data) => handleSuspend(data.reason)}
      />
    </>
  );
};

export { SuspendProperty };
