import { rejectPropertyService } from "api";
import { Preloader, Toast } from "components";
import { RejectPropertyModal } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useState, useMemo } from "react";

interface RejectPropertyProps {
  show: boolean;
  close: () => void;
  propertyID: string;
  callback: () => void;
}

const RejectProperty: React.FC<RejectPropertyProps> = ({
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
  const {
    run: runReject,
    data: rejectResponse,
    requestStatus: rejectStatus,
    error: rejectError,
  } = useApiRequest({});

  const handleReject = (reason) =>
    runReject(rejectPropertyService(propertyID, reason));

  useMemo(() => {
    if (rejectResponse?.status === 200) {
      setToast({
        show: true,
        text: rejectResponse.data.message ?? "Successfully rejected property",
        type: true,
      });
      callback();
      close();
    } else if (rejectError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: rejectError,
          message: "Failed to reject property, please try again later",
        }),
        type: false,
      });
    }
  }, [rejectResponse, rejectError]);

  const showLoader = rejectStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <RejectPropertyModal
        show={show}
        close={close}
        submit={(data) => handleReject(data.reason)}
      />
    </>
  );
};

export { RejectProperty };
