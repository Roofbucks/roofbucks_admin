import { setMarketValueService } from "api";
import { Preloader, Toast } from "components";
import { AddMarketValueModal } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useState, useMemo } from "react";

interface AddMarketValueProps {
  show: boolean;
  close: () => void;
  propertyID: string;
  callback: () => void;
  currentValue: number;
}

const AddMarketValue: React.FC<AddMarketValueProps> = ({
  show,
  close,
  propertyID,
  callback,
  currentValue,
}) => {
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });

  // API Hooks
  const {
    run: runUpdate,
    data: updateResponse,
    requestStatus: updateStatus,
    error: updateError,
  } = useApiRequest({});

  const handleMarketValue = (value) =>
    runUpdate(setMarketValueService(propertyID, value));

  useMemo(() => {
    if (updateResponse?.status === 200) {
      setToast({
        show: true,
        text:
          updateResponse.data.message ?? "Successfully updated market value",
        type: true,
      });
      callback();
      close();
    } else if (updateError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: updateError,
          message: "Failed to update market value, please try again later",
        }),
        type: false,
      });
    }
  }, [updateResponse, updateError]);

  const showLoader = updateStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <AddMarketValueModal
        show={show}
        close={close}
        submit={handleMarketValue}
        value={currentValue}
        currency={"NGN"}
      />
    </>
  );
};

export { AddMarketValue };
