import { PropertyUI } from "features";
import { useNavigate } from "react-router-dom";

const Property = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  
  return (
    <>
      <PropertyUI goBack={goBack} />
    </>
  );
};

export { Property };
