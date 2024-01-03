import { userService } from "api";
import { UsersUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { run: runUserData, data: userData, error } = useApiRequest({});

  const handleView = (id) => {
    navigate(Routes.user(id));
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await runUserData(userService());
        // Assuming the response contains an array of user data
        setUsers(response.data || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, [runUserData]);

  useMemo(() => {
    if (userData?.status === 200) {
      alert("You have successfully retrieved usersData.");
    } else if (error) {
      alert("Failed to get usersData, please try again later.");
    }
  }, [userData, error]);

  return (
    <>
      <UsersUI handleView={handleView} users={users} />
    </>
  );
};

export { Users };