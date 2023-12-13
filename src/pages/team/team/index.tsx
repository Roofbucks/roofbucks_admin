import {
  deleteMemberService,
  fetchMembersService,
  inviteMemberService,
} from "api";
import { ConfirmationModal, Preloader, TeamTableItem, Toast } from "components";
import { TeamUI } from "features";
import { getErrorMessage } from "helpers";
import { useDebounce } from "hooks";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";

const Team = () => {
  // States
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });
  const [clear, setClear] = useState(false);
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(undefined);
  const debouncedSearchTerm = useDebounce(search, 500);
  const [removeMember, setRemoveMember] = useState({
    id: "",
    email: "",
    show: false,
  });

  // API Hooks
  const {
    run: runInvite,
    data: inviteResponse,
    requestStatus: inviteStatus,
    error: inviteError,
  } = useApiRequest({});
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});
  const {
    run: runRemove,
    data: removeResponse,
    requestStatus: removeStatus,
    error: removeError,
  } = useApiRequest({});

  const fetchMembers = (page?) => {
    runFetch(
      fetchMembersService({
        page: page ?? pages.currentPage,
        limit: pages.pageLimit,
        search,
        role,
      })
    );
  };

  useEffect(() => {
    fetchMembers(1);
    setPages((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  }, [debouncedSearchTerm, role]);

  const handleInvite = (data) => {
    runInvite(inviteMemberService(data));
  };

  useMemo(() => {
    if (inviteResponse?.status === 201) {
      setToast({
        show: true,
        text: inviteResponse.data.message ?? "Members added successfully!",
        type: true,
      });
      fetchMembers();
      setClear(!clear);
      setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 2500);
    } else if (inviteError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: inviteError,
          message: "Failed to add members, please try again later",
        }),
        type: false,
      });
    }
  }, [inviteResponse, inviteError]);

  const members = useMemo<TeamTableItem[]>(() => {
    if (fetchResponse?.status === 200) {
      console.log(fetchResponse);
      setPages((prev) => ({
        ...prev,
        totalPages: fetchResponse.data.pages,
        totalCount: fetchResponse.data.total,
      }));

      return fetchResponse.data.results.map((item) => ({
        id: item.id,
        name: `${item.firstname} ${item.lastname}`,
        email: item.email,
        role: item.role,
        dateAdded: new Date(item.created_at).toLocaleDateString(),
      }));
    } else if (fetchError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchError,
          message: "Failed to fetch members, please try again later",
        }),
        type: false,
      });
    }
    return [];
  }, [fetchResponse, fetchError]);

  const handlePages = (page: number) => {
    fetchMembers(page);
    setPages((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleDelete = () => {
    runRemove(deleteMemberService(removeMember.id));
  };

  useMemo(() => {
    if (removeResponse?.status === 204) {
      setRemoveMember({ show: false, id: "", email: "" });
      setToast({
        show: true,
        text: removeResponse.data.message ?? "Member removed successfully!",
        type: true,
      });

      setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 2500);
      fetchMembers();
    } else if (removeError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: removeError,
          message: "Failed to remove member, please try again later",
        }),
        type: false,
      });
    }
  }, [removeResponse, removeError]);

  const showLoader =
    inviteStatus.isPending || fetchStatus.isPending || removeStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <ConfirmationModal
        show={removeMember.show}
        close={() => setRemoveMember((prev) => ({ ...prev, show: false }))}
        submit={handleDelete}
        text={`Are you sure you want to remove ${removeMember.email}?`}
      />
      <TeamUI
        handleInvite={handleInvite}
        clear={clear}
        members={members}
        pagination={{ ...pages, handleChange: handlePages }}
        search={{
          value: search,
          handleChange: setSearch,
        }}
        role={{
          value: role,
          handleChange: setRole,
        }}
        handleDelete={({ id, email }) =>
          setRemoveMember({ id, email, show: true })
        }
      />
    </>
  );
};

export { Team };
