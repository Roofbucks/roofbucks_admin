import { rejectEditService } from "api";
import { Preloader, Toast } from "components";
import { RejectPropertyModal } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useState, useMemo } from "react";

interface RejectPropertyProps {
  show: boolean;
  close: () => void;
  id: string;
  callback: () => void;
}

const RejectPropertyEdit: React.FC<RejectPropertyProps> = ({
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
    run: runReject,
    data: rejectResponse,
    requestStatus: rejectStatus,
    error: rejectError,
  } = useApiRequest({});

  const handleReject = (reason) =>
    runReject(rejectEditService(id, reason));

  useMemo(() => {
    if (rejectResponse?.status === 200) {
      setToast({
        show: true,
        text:
          rejectResponse.data.message ?? "Successfully rejected property edit",
        type: true,
      });
      callback();
      close();
    } else if (rejectError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: rejectError,
          message: "Failed to reject property edit, please try again later",
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
        isEdit
      />
    </>
  );
};

export { RejectPropertyEdit };
