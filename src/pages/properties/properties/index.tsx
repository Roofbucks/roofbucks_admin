import { fetchEditedPropertiesService, fetchPropertiesService } from "api";
import {
  Preloader,
  PropertyTableItem,
  Toast,
  initOptionType,
} from "components";
import { PropertiesUI } from "features";
import { getDateTime, getErrorMessage } from "helpers";
import { useApiRequest, useDebounce } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { optionType } from "types";

const Properties = () => {
  // States
  const [pages, setPages] = useState({
    currentPage: 1,
    totalPages: 1,
    pageLimit: 10,
    totalCount: 0,
  });
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });
  const [status, setStatus] = useState<optionType | undefined>(undefined);
  const [date, setDate] = useState({ start: "", end: "" });
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("properties");

  const navigate = useNavigate();
  const handleView = (id) => navigate(Routes.property(id));
  const debouncedSearchTerm = useDebounce(search, 500);

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});
  const {
    run: runFetchEdit,
    data: fetchEditResponse,
    requestStatus: fetchEditStatus,
    error: fetchEditError,
  } = useApiRequest({});

  const fetchProperties = (page?, dates?, propertyStatus?) =>
    runFetch(
      fetchPropertiesService({
        page: page ?? pages.currentPage,
        limit: pages.pageLimit,
        search,
        status: propertyStatus?.value ?? status?.value,
        stage: "",
        start_date: dates?.start ?? date.start,
        end_date: dates?.end ?? date.end,
      })
    );

  const fetchEditedProperties = (page?) =>
    runFetchEdit(
      fetchEditedPropertiesService({
        page: page ?? pages.currentPage,
        limit: pages.pageLimit,
      })
    );

  useEffect(() => {
    fetchProperties(1);
    fetchEditedProperties(1);
    setPages((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  }, [debouncedSearchTerm]);

  const properties = useMemo<PropertyTableItem[]>(() => {
    if (fetchResponse?.status === 200) {
      setPages((prev) => ({
        ...prev,
        totalPages: fetchResponse.data.pages,
        totalCount: fetchResponse.data.total,
      }));

      return fetchResponse.data.results.map((item) => ({
        propertyID: item.id,
        propertyName: item.name,
        agent: item.agent,
        status: item.moderation_status.toLowerCase(),
        date: getDateTime(item.created_at).date,
        amount: `${item.total_property_cost}`,
      }));
    } else if (fetchError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchError,
          message: "Failed to fetch properties, please try again later",
        }),
        type: false,
      });
    }
    return [];
  }, [fetchResponse, fetchError]);

  const editedProperties = useMemo<PropertyTableItem[]>(() => {
    if (fetchEditResponse?.status === 200) {
      setPages((prev) => ({
        ...prev,
        totalPages: fetchEditResponse.data.pages,
        totalCount: fetchEditResponse.data.total,
      }));

      return fetchEditResponse.data.results.map((item) => ({
        propertyID: item.id,
        propertyName: item.name,
        agent: item.agent,
        status: item.moderation_status.toLowerCase(),
        date: getDateTime(item.created_at).date,
        amount: `${item.total_property_cost}`,
      }));
    } else if (fetchEditError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchEditError,
          message: "Failed to fetch edited properties, please try again later",
        }),
        type: false,
      });
    }
    return [];
  }, [fetchEditResponse, fetchEditError]);

  const handlePages = (page: number) => {
    tab === "properties" ? fetchProperties(page) : fetchEditedProperties(page);
    setPages((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleTab = (tab) => {
    setTab(tab);
    setStatus(initOptionType);
    setDate({ start: "", end: "" });
    setPages((prev) => ({
      ...prev,
      currentPage: 1,
    }));
    tab === "properties"
      ? fetchProperties(1, { start: "", end: "" }, initOptionType)
      : fetchEditedProperties(1);
  };

  const handleFilter = ({ status, date }) => {
    setStatus(status);
    setDate(date);
    setPages((prev) => ({
      ...prev,
      currentPage: 1,
    }));
    fetchProperties(1, date, status);
  };

  const loading = fetchStatus.isPending || fetchEditStatus.isPending;

  return (
    <>
      <Preloader loading={loading} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <PropertiesUI
        handleView={handleView}
        properties={tab === "properties" ? properties : editedProperties}
        tab={{
          value: tab,
          handleChange: handleTab,
        }}
        count={{
          all: fetchResponse?.data?.total ?? 0,
          edited: fetchEditResponse?.data?.total ?? 0,
        }}
        pagination={{ ...pages, handleChange: handlePages }}
        search={{
          value: search,
          handleChange: setSearch,
        }}
        status={status}
        date={date}
        handleFilter={handleFilter}
      />
    </>
  );
};

export { Properties };
