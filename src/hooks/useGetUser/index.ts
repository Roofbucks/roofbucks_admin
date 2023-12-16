import { fetchProfileService } from "api";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "state/actions";
import { useAppDispatch } from "state/hooks";
import { Routes } from "router";

export const useGetUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { run, data: response, requestStatus, error } = useApiRequest({});

  const fetchUser = () => {
    run(fetchProfileService());
  };

  useMemo(() => {
    if (response) {
      if (response.status === 200) {
        const firstName = response.data.firstname;
        const lastName = response.data.lastname;
        const role: any = localStorage.getItem("role");

        dispatch(
          updateUser({
            role: role ?? "Member",
            firstName,
            lastName,
          })
        );
      } else {
        navigate(Routes.home);
        localStorage.clear();
      }
    }
  }, [response, error]);

  return {
    fetchUser,
    loading: requestStatus.isPending,
  };
};
