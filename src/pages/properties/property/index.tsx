import { PropertyData, PropertyUI } from "features";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApproveProperty } from "../approveProperty";
import { RejectProperty } from "../rejectProperty";
import { AddMarketValue } from "../addMarketValue";
import { UpdateRent } from "../updateRent";
import { useApiRequest } from "hooks";
import { fetchPropertyService } from "api";
import { getErrorMessage } from "helpers";
import { Preloader, Toast } from "components";
import { SuspendProperty } from "../suspendProperty";
import { UnsuspendProperty } from "../unsuspendProperty";

const Property = () => {
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [suspend, setSuspend] = useState(false);
  const [unsuspend, setUnsuspend] = useState(false);
  const [marketValue, setMarketValue] = useState(false);
  const [rent, setRent] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });

  const navigate = useNavigate();
  const { id: propertyID } = useParams();

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});

  const fetchProperty = () =>
    propertyID && runFetch(fetchPropertyService(propertyID));

  useEffect(() => {
    fetchProperty();
  }, [propertyID]);

  const property = useMemo<PropertyData | undefined>(() => {
    if (fetchResponse?.status === 200) {
      const data = fetchResponse.data;

      return {
        status: data.moderation_status.toLowerCase(),
        id: data.id,
        name: data.name,
        type: data.apartment_type,
        completionStatus: data.completion_status.toLowerCase(),
        completionPercentage: data.percentage_completed,
        completionCost: `NGN ${data.completion_cost}`,
        completionDate: data.completion_date,
        yearBuilt: data.date_built,
        noOfBedrooms: data.number_of_bedrooms,
        noOfToilets: data.number_of_toilets,
        totalCost: `NGN ${data.total_property_cost?.toLocaleString()}`,
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zip_code,
        country: data.country,
        amenities: data.amenities,
        erfSize: `${data.ERF_size} SQM`,
        diningArea: `${data.dining_area} seats`,
        floorSize: `${data.floor_size} SQM`,
        crossRoads: {
          address1: data.cross_streets[0],
          address2: data.cross_streets[1],
        },
        landmarks: {
          address1: data.landmarks[0],
          address2: data.landmarks[1],
        },
        media: data.images,
        surveyPlan: data.approved_survey_plan,
        purchaseReceipt: data.purchase_receipt,
        excision: data.excision_document,
        gazette: data.gazette_document,
        deedOfAssignment: data.registered_deed_of_assignment,
        certificateOfOccupancy: data.certificate_of_occupancy,
        otherDocs: data.others.map((item) => ({
          name: item.name,
          file: item.url,
        })),
        agent: {
          firstName: data.agent.firstname,
          lastName: data.agent.lastname,
          email: data.agent.email,
          phone: data.agent.phone,
          address: data.agent.address,
          city: data.agent.city,
          country: data.agent.country,
          id: data.agent.id,
        },
        homeBuyer: data.house_owner
          ? {
              firstName: data.house_owner.user.firstname,
              lastName: data.house_owner.user.lastname,
              email: data.house_owner.user.email,
              phone: data.house_owner.user.phone,
              address: data.house_owner.user.address,
              city: data.house_owner.user.city,
              country: data.house_owner.user.country,
              id: data.house_owner.user.id,
              percentage: data.house_owner.percentage,
            }
          : undefined,
        investors: data.investors.map((item) => ({
          firstName: item.user.firstname,
          lastName: item.user.lastname,
          email: item.user.email,
          phone: item.user.phone,
          address: item.user.address,
          city: item.user.city,
          country: item.user.country,
          id: item.user.id,
          percentage: item.percentage,
        })),
        rent: data.rent_amount,
        marketValue: data.market_value,
      };
    } else if (fetchError) {
      setToast({
        show: true,
        text: getErrorMessage({
          error: fetchError,
          message: "Failed to fetch property, please try again later",
        }),
        type: false,
      });
    }
    return undefined;
  }, [fetchResponse, fetchError]);

  const goBack = () => navigate(-1);

  const showLoader = fetchStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      {propertyID ? (
        <>
          <ApproveProperty
            show={approve}
            close={() => setApprove(false)}
            propertyID={propertyID}
            callback={fetchProperty}
          />
          <RejectProperty
            show={reject}
            close={() => setReject(false)}
            propertyID={propertyID}
            callback={fetchProperty}
          />
          <SuspendProperty
            show={suspend}
            close={() => setSuspend(false)}
            propertyID={propertyID}
            callback={fetchProperty}
          />
          <UnsuspendProperty
            show={unsuspend}
            close={() => setUnsuspend(false)}
            propertyID={propertyID}
            callback={fetchProperty}
          />
          <UpdateRent
            propertyID={propertyID}
            callback={fetchProperty}
            show={rent}
            close={() => setRent(false)}
            rent={property?.rent ?? 0}
          />
          <AddMarketValue
            propertyID={propertyID}
            callback={fetchProperty}
            show={marketValue}
            close={() => setMarketValue(false)}
            currentValue={property?.marketValue ?? 0}
          />
        </>
      ) : (
        ""
      )}

      {property ? (
        <PropertyUI
          goBack={goBack}
          handleApprove={() => setApprove(true)}
          handleReject={() => setReject(true)}
          handleMarketValue={() => setMarketValue(true)}
          handleRent={() => setRent(true)}
          handleSuspend={() => setSuspend(true)}
          handleUnsuspend={() => setUnsuspend(true)}
          property={property}
        />
      ) : (
        ""
      )}
    </>
  );
};

export { Property };
