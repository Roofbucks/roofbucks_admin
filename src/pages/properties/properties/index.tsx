import { PropertiesUI } from "features";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Properties = () => {
  const navigate = useNavigate();

  const handleView = (id) => navigate(Routes.property(id));
  
  return (
    <>
      <PropertiesUI handleView={handleView} />
    </>
  );
};

export { Properties };
