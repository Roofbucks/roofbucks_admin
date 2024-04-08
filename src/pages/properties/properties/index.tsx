import { propertiesService } from "api";
import { Preloader, PropertyTableItem } from "components";
import { PropertiesUI } from "features";
import { useApiRequest } from "hooks/useApiRequest";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

interface FilterData {
  status: {
    label?: any;
    value?: any;
  };
  startDate: string;
  endDate: string;
}

const Properties = () => {
  const navigate = useNavigate();
    const {
    run: runPropertiesData,
    requestStatus: propertiesStatus,
    data: propertiesResponse
  } = useApiRequest({})
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<PropertyTableItem[]>([])
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterData>({
    status: { label: "", value: "" },
    startDate: "",
    endDate: ""
  });

  useMemo(() => {
    if (propertiesResponse?.status === 200) {
      const propertiesData = propertiesResponse?.data.results;
      setTotalUsers(propertiesResponse?.data.total);
      setTotalPages(propertiesResponse?.data.pages);

      const propertiesList = propertiesData.map((item) => ({
        propertyID: item.id?.substring(0, 8),
        propertyName: item.name,
        agent: item.agent,
        amount: item.total_property_cost,
        date: item.created_at?.substring(0, 10),
        status: item.moderation_status?.toLowerCase(),
        stage: item.stage?.toLowerCase(),
      }));
      setProperties(propertiesList);
    } else if (propertiesResponse?.status === 404) {
      console.log("there was an error");
    }
  }, [propertiesResponse]);

  useEffect(() => {
    runPropertiesData(propertiesService({
      searchTerm: searchTerm,
      currentPage: currentPage,
      status: filter.status.value,
      stage: "",
      limit: 10,
      startDate: filter.startDate,
      endDate: filter.endDate
    }));
  }, [currentPage, filter, searchTerm]);

  useEffect(() => {
    setLoading(propertiesStatus.isPending);
  }, [propertiesStatus]);

  const handleFilter = (data: any) => {
    setFilter({
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate
    });
    setCurrentPage(1);
  };
  const handlePages = (currentPage) => {
    setCurrentPage(currentPage);
  };
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };
  const handleView = (id) => navigate(Routes.property(id));
  
  return (
    <>
      <Preloader loading={loading} />
      <PropertiesUI
        properties={properties}
        handleView={handleView}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        pagination={{
          handleChange: handlePages,
          total: totalPages,
          current: currentPage,
          count: totalUsers,
          limit: 0
        }}
        startDate=""
        endDate=""
        status={{
          label: undefined,
          value: undefined
        }}      />
    </>
  );
};

export { Properties };
