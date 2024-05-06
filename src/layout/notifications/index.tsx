import { Preloader, Toast, useOutsideAlerter } from "components";
import styles from "./styles.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { CaretRight, ChevronIcon, CloseIcon } from "assets";
import { fetchNotifsService, markAsReadService } from "api";
import { getErrorMessage, timeAgo } from "helpers";
import { useApiRequest } from "hooks";
import React from "react";

interface NotifDropdownProps {
  show: boolean;
  className?: string;
  closeMenu: (x: boolean) => void;
}

const Notifications: React.FC<NotifDropdownProps> = ({
  show,
  className = "",
  closeMenu,
}) => {
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  });
  const [status, setStatus] = useState("");

  const listRef = useRef(null);
  const onHide = () => {
    closeMenu(false);
    setPages({
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
    });
  };
  useOutsideAlerter(listRef, onHide);

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});
  const {
    run: runRead,
    data: readResponse,
    requestStatus: readStatus,
    error: readError,
  } = useApiRequest({});

  const fetchNotifs = (page?) =>
    runFetch(fetchNotifsService(page ?? pages.currentPage, status));
  const handleRemoveActivity = (id) => runRead(markAsReadService(id));

  useEffect(() => {
    show && fetchNotifs();
  }, [show, status]);

  const notifications = useMemo(() => {
    if (fetchResponse?.status === 200) {
      setPages((prev) => ({
        ...prev,
        totalPages: fetchResponse.data.pages,
        totalCount: fetchResponse.data.total,
      }));

      return fetchResponse.data.results.results.map((item) => ({
        date: timeAgo(new Date(item.created_at)),
        message: item.message,
        id: item.id,
        unread: item.status.toLowerCase() === "unread",
      }));
    } else if (fetchError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchError,
          message: "Failed to fetch notifications, please try again later",
        }),
        type: false,
      });
    }

    return [];
  }, [fetchResponse, fetchError]);

  React.useMemo(() => {
    if (readResponse?.status === 204) {
      fetchNotifs(1);
    } else if (readError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchError,
          message: "Failed to clear notification, please try again later",
        }),
        type: false,
      });
    }

    return [];
  }, [readResponse, readError]);

  const handlePagination = (page) => {
    fetchNotifs(page);
    setPages((prev) => ({ ...prev, currentPage: page }));
  };

  const handleIncrease = () => {
    if (pages.currentPage < pages.totalPages)
      handlePagination(pages.currentPage + 1);
  };

  const handleDecrease = () => {
    if (pages.currentPage > 1) handlePagination(pages.currentPage - 1);
  };

  const showLoader = readStatus.isPending || fetchStatus.isPending;

  const statuses = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Read",
      value: "read",
    },
    {
      label: "Unread",
      value: "unread",
    },
  ];

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      {show ? (
        <aside ref={listRef} className={styles.container}>
          <div className={styles.notifHdSec}>
            <p className={styles.notifHeading}>Notifications</p>{" "}
            {/* <button>Clear all</button> */}
          </div>
          <div className={styles.notifTabs}>
            {statuses.map((item) => (
              <button
                onClick={() => setStatus(item.value)}
                className={item.value === status ? styles.activeStatus : ""}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className={styles.notifList}>
            {notifications.length > 0 ? (
              notifications.map(({ date, message, id, unread }) => (
                <div
                  className={`${styles.notifCard} ${
                    unread ? styles.unread : ""
                  }`}
                >
                  <p className={styles.notifTxt}>{message}</p>
                  <div>
                    <CloseIcon
                      role="button"
                      onClick={() => handleRemoveActivity(id)}
                      className={styles.clearIcon}
                    />
                  </div>
                  <p className={`${styles.notifTime} `}>{date}</p>
                </div>
              ))
            ) : (
              <p className={styles.empty}>
                You have no notifications at this time
              </p>
            )}
          </div>
          <div className={styles.pagination}>
            <button
              onClick={handleIncrease}
              disabled={pages.currentPage >= pages.totalPages}
            >
              <CaretRight /> Prev
            </button>
            <button onClick={handleDecrease} disabled={pages.currentPage <= 1}>
              Next <CaretRight />
            </button>
          </div>
        </aside>
      ) : (
        ""
      )}
    </>
  );
};

export { Notifications };
