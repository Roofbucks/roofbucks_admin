import { AddMarketValueModal } from "features";

interface AddMarketValueProps {
  show: boolean;
  close: () => void;
}

const AddMarketValue: React.FC<AddMarketValueProps> = ({ show, close }) => {
  return (
    <>
      <AddMarketValueModal
        show={show}
        close={close}
        submit={console.log}
        value={undefined}
        currency={"NGN"}
      />
    </>
  );
};

export { AddMarketValue };
