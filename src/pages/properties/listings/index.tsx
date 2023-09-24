import { ListingsUI } from "features";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { ListingApplication } from "../listingApplication";
import { useState } from "react";

const Listings = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleViewProperty = (id) => navigate(Routes.property(id));
  const handleViewApplication = (id) => setShow(true);

  return (
    <>
      <ListingApplication show={show} close={() => setShow(false)} />
      <ListingsUI
        handleViewProperty={handleViewProperty}
        handleViewApplication={handleViewApplication}
      />
    </>
  );
};

export { Listings };
