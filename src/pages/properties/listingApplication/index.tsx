import { ListingApplicationUI } from "features";
import { useState } from "react";

const ListingApplication = ({ show, close, callback }) => {
  return (
    <>
      <ListingApplicationUI discard={console.log} show={show} close={close} />
    </>
  );
};

export { ListingApplication };
