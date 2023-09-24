import { UserProfileUI } from "features";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const UserProfile = () => {
  const navigate = useNavigate();

  const handleView = (id) => navigate(Routes.property(id));

  return (
    <>
      <UserProfileUI handleView={handleView} />
    </>
  );
};

export { UserProfile };
