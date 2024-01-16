import { setRentService } from "api";
import { Preloader, Toast } from "components";
import { UpdateRentModal } from "features";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { useState, useMemo } from "react";

interface UpdateRentProps {
  show: boolean;
  close: () => void;
  propertyID: string;
  callback: () => void;
  rent: number;
}

const UpdateRent: React.FC<UpdateRentProps> = ({
  show,
  close,
  propertyID,
  callback,
  rent,
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

  const handleRent = (rent) => runUpdate(setRentService(propertyID, rent));

  useMemo(() => {
    if (updateResponse?.status === 200) {
      setToast({
        show: true,
        text: updateResponse.data.message ?? "Successfully updated rent",
        type: true,
      });
      callback();
      close();
    } else if (updateError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: updateError,
          message: "Failed to update rent, please try again later",
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
      <UpdateRentModal
        show={show}
        close={close}
        submit={handleRent}
        value={rent}
      />
    </>
  );
};

export { UpdateRent };
