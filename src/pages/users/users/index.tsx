import { UsersUI } from "features";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Users = () => {
  const navigate = useNavigate()

  const handleView = (id) => navigate(Routes.user(id))
  return (
    <>
      <UsersUI handleView={handleView} />
    </>
  );
};

export { Users };
