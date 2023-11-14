import { UpdateRentModal } from "features";

interface UpdateRentProps {
  show: boolean;
  close: () => void;
}

const UpdateRent: React.FC<UpdateRentProps> = ({ show, close }) => {
  return (
    <>
      <UpdateRentModal
        show={show}
        close={close}
        submit={console.log}
        value={0.6}
      />
    </>
  );
};

export { UpdateRent };
