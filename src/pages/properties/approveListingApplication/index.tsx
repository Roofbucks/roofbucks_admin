import { ApproveListingApplicationModal } from "features";

interface ApproveListingApplicationProps {
  show: boolean;
  close: () => void;
}

const ApproveListingApplication: React.FC<ApproveListingApplicationProps> = ({
  show,
  close,
}) => {
  return (
    <>
      <ApproveListingApplicationModal
        show={show}
        close={close}
        submit={console.log}
      />
    </>
  );
};

export { ApproveListingApplication };
