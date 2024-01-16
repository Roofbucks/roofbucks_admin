import { approvePropertyService } from "api";
import { ConfirmationModal, Preloader, Toast } from "components";
import { ApprovePropertyModal } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useState, useMemo } from "react";

interface ApprovePropertyProps {
  show: boolean;
  close: () => void;
  propertyID: string;
  callback: () => void;
}

const ApproveProperty: React.FC<ApprovePropertyProps> = ({
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
    run: runApprove,
    data: approveResponse,
    requestStatus: approveStatus,
    error: approveError,
  } = useApiRequest({});

  const handleApprove = () => runApprove(approvePropertyService(propertyID));

  useMemo(() => {
    if (approveResponse?.status === 200) {
      setToast({
        show: true,
        text: approveResponse.data.message ?? "Successfully approved property",
        type: true,
      });
      callback();
      close();
    } else if (approveError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: approveError,
          message: "Failed to approve property, please try again later",
        }),
        type: false,
      });
    }
  }, [approveResponse, approveError]);

  const showLoader = approveStatus.isPending;

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
        text={
          <>
            Are you sure you want to approve this property?
            <br /> <br /> <b>NB: </b>You must have set the market value to
            approve a property
          </>
        }
        submit={handleApprove}
      />
    </>
  );
};

export { ApproveProperty };
