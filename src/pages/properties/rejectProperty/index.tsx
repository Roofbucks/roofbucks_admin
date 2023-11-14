import { RejectPropertyModal } from "features";

interface RejectPropertyProps {
  show: boolean;
  close: () => void;
}

const RejectProperty: React.FC<RejectPropertyProps> = ({ show, close }) => {
  return (
    <>
      <RejectPropertyModal show={show} close={close} submit={console.log} />
    </>
  );
};

export { RejectProperty };
