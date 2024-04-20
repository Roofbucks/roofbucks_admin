import {
  rejectPropertyService,
  suspendPropertyService,
  unsuspendPropertyService,
} from "api";
import { ConfirmationModal, Preloader, Toast } from "components";
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

const UnsuspendProperty: React.FC<SuspendPropertyProps> = ({
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

  const handleUnsuspend = () => run(unsuspendPropertyService(propertyID));

  useMemo(() => {
    if (response?.status === 200) {
      setToast({
        show: true,
        text: response.data.message ?? "Successfully unsuspended property",
        type: true,
      });
      callback();
      close();
    } else if (error) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: error,
          message: "Failed to unsuspend property, please try again later",
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
      <ConfirmationModal
        show={show}
        close={close}
        text={"Are you sure you want to unsuspend this property?"}
        submit={handleUnsuspend}
      />
    </>
  );
};

export { UnsuspendProperty };
