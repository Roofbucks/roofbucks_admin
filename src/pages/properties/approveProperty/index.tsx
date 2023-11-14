import { ApprovePropertyModal } from "features";

interface ApprovePropertyProps {
  show: boolean;
  close: () => void;
}

const ApproveProperty: React.FC<ApprovePropertyProps> = ({ show, close }) => {
  return (
    <>
      <ApprovePropertyModal show={show} close={close} submit={console.log} />
    </>
  );
};

export { ApproveProperty };
