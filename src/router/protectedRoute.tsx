import React, { useEffect, useState } from "react";
import { useGetUser } from "hooks";
import { Routes } from "./routes";
import { Navigate, useNavigate } from "react-router-dom";

/**
 * PROTECTED ROUTE COMPONENT
 *
 * ===============================================
 *
 * This component houses all protected routes
 *
 *
 */

const ProtectedRoute: React.FC<{ children: any }> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { fetchUser, loading } = useGetUser();
  const accessToken = localStorage.getItem("roofbucksAdminAccess");

  const checkUser = () => {
    if (!accessToken || accessToken === "undefined") {
      setIsLoggedIn(false);
      localStorage.clear();
      return navigate(Routes.home);
    }
    setIsLoggedIn(true);
    fetchUser();
  };

  useEffect(() => {
    checkUser();
  }, [isLoggedIn]);

  return <>{isLoggedIn ? children : null}</>;
};

export { ProtectedRoute };
