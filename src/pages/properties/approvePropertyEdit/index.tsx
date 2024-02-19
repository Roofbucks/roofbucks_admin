import { approveEditService } from "api";
import { ConfirmationModal, Preloader, Toast } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useState, useMemo } from "react";

interface ApprovePropertyProps {
  show: boolean;
  close: () => void;
  id: string;
  callback: () => void;
}

const ApprovePropertyEdit: React.FC<ApprovePropertyProps> = ({
  show,
  close,
  id,
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

  const handleApprove = () => runApprove(approveEditService(id));

  useMemo(() => {
    if (approveResponse?.status === 200) {
      setToast({
        show: true,
        text:
          approveResponse.data.message ?? "Successfully approved property edit",
        type: true,
      });
      callback();
      close();
    } else if (approveError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: approveError,
          message: "Failed to approve property edit, please try again later",
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
          <>Are you sure you want to approve the changes to this property?</>
        }
        submit={handleApprove}
      />
    </>
  );
};

export { ApprovePropertyEdit };
