import { MarketplaceUI } from "features";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { MarketplaceApplication } from "../marketplaceApplication";
import { useState } from "react";

const Marketplace = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleViewProperty = (id) => navigate(Routes.property(id));
  const handleViewApplication = (id) => setShow(true);

  return (
    <>
      <MarketplaceApplication show={show} close={() => setShow(false)} />
      <MarketplaceUI
        handleViewProperty={handleViewProperty}
        handleViewApplication={handleViewApplication}
      />
    </>
  );
};

export { Marketplace };
