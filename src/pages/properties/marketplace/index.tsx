import { MarketplaceUI } from "features";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { MarketplaceApplication } from "../marketplaceApplication";
import { useEffect, useMemo, useState } from "react";
import { fetchPropertiesService, fetchApplicationsService } from "api";
import {
  PropertyTableItem,
  ListingApplicationTableItem,
  Preloader,
  Toast,
  MarketplaceApplicationTableItem,
} from "components";
import { getDateTime, getErrorMessage } from "helpers";
import { useDebounce, useApiRequest } from "hooks";
import { optionType } from "types";

const Marketplace = () => {
  // States
  const [show, setShow] = useState(false);
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
  const [date, setDate] = useState({ start: "", end: "" });
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("properties");

  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(search, 500);
  const handleViewProperty = (id) => navigate(Routes.property(id));
  const handleViewApplication = (id) => setShow(true);

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});
  const {
    run: runFetchApplications,
    data: fetchApplicationsResponse,
    requestStatus: fetchApplicationsStatus,
    error: fetchApplicationsError,
  } = useApiRequest({});

  const fetchProperties = (page?, dates?) =>
    runFetch(
      fetchPropertiesService({
        page: page ?? pages.currentPage,
        limit: pages.pageLimit,
        search,
        start_date: dates?.start ?? date.start,
        end_date: dates?.end ?? date.end,
        status: "",
        stage: "MARKETPLACE",
      })
    );

  const fetchApplications = (page?, dates?) =>
    runFetchApplications(
      fetchApplicationsService({
        page: page ?? pages.currentPage,
        limit: pages.pageLimit,
        search,
        start_date: dates?.start ?? date.start,
        end_date: dates?.end ?? date.end,
        status: "",
        user_type: "INVESTOR",
      })
    );

  useEffect(() => {
    fetchProperties(1);
    fetchApplications(1);
    setPages((prev) => ({
      ...prev,
      currentPage: 1,
    }));
    setDate({ start: "", end: "" });
  }, [debouncedSearchTerm, tab]);

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
          message: "Failed to fetch listings, please try again later",
        }),
        type: false,
      });
    }
    return [];
  }, [fetchResponse, fetchError]);

  const applications = useMemo<MarketplaceApplicationTableItem[]>(() => {
    if (fetchApplicationsResponse?.status === 200) {
      setPages((prev) => ({
        ...prev,
        totalPages: fetchApplicationsResponse.data.pages,
        totalCount: fetchApplicationsResponse.data.total,
      }));

      return fetchApplicationsResponse.data.results.map((item) => ({
        id: item.id,
        property: item.property,
        propertyID: item.property_id,
        agent: item.agent,
        name: item.applicant,
        email: item.email,
        location: `${item.state}, ${item.country}`,
        // percentage: `${item.percentage_ownership}%`,
        date: getDateTime(item.created_at).date,
        focus: item.investment_focus,
      }));
    } else if (fetchApplicationsError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchApplicationsError,
          message:
            "Failed to fetch listing applications, please try again later",
        }),
        type: false,
      });
    }
    return [];
  }, [fetchApplicationsResponse, fetchApplicationsError]);

  const handlePages = (page: number) => {
    tab === "properties" ? fetchProperties(page) : fetchApplications(page);
    setPages((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleDate = (data: { start: string; end: string }) => {
    setDate(data);
    fetchProperties(1, data);
  };

  const handleTab = (tab) => {
    setTab(tab);
    setDate({ start: "", end: "" });
    setPages((prev) => ({
      ...prev,
      currentPage: 1,
    }));
    tab === "properties"
      ? fetchProperties(1, { start: "", end: "" })
      : fetchApplications(1, { start: "", end: "" });
  };

  const loading = fetchStatus.isPending || fetchApplicationsStatus.isPending;

  return (
    <>
      <Preloader loading={loading} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <MarketplaceApplication show={show} close={() => setShow(false)} />
      <MarketplaceUI
        handleViewProperty={handleViewProperty}
        handleViewApplication={handleViewApplication}
        properties={properties}
        applications={applications}
        tab={{
          value: tab,
          handleChange: handleTab,
        }}
        count={{
          all: fetchResponse?.data?.total ?? 0,
          applications: fetchApplicationsResponse?.data?.total ?? 0,
        }}
        pagination={{ ...pages, handleChange: handlePages }}
        search={{
          value: search,
          handleChange: setSearch,
        }}
        date={{
          value: date,
          handleChange: handleDate,
        }}
      />
    </>
  );
};

export { Marketplace };
