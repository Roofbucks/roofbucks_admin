import { ApproveMarketplaceApplicationModal } from "features";

interface ApproveMarketplaceApplicationProps {
  show: boolean;
  close: () => void;
}

const ApproveMarketplaceApplication: React.FC<
  ApproveMarketplaceApplicationProps
> = ({ show, close }) => {
  return (
    <>
      <ApproveMarketplaceApplicationModal
        show={show}
        close={close}
        submit={console.log}
      />
    </>
  );
};

export { ApproveMarketplaceApplication };
