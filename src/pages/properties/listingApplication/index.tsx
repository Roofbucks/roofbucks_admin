import { ListingApplicationUI } from "features";

const ListingApplication = ({ show, close }) => {
  return (
    <>
      <ListingApplicationUI show={show} close={close} />
    </>
  );
};

export { ListingApplication };
