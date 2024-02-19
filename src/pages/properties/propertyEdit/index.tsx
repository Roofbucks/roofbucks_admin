import { PropertyEditData, PropertyEditUI } from "features";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApproveProperty } from "../approveProperty";
import { RejectProperty } from "../rejectProperty";
import { useApiRequest } from "hooks";
import { fetchEditService } from "api";
import { getErrorMessage } from "helpers";
import { Preloader, Toast } from "components";
import { ApprovePropertyEdit } from "../approvePropertyEdit";
import { RejectPropertyEdit } from "../rejectPropertyEdit";

const PropertyEdit = () => {
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    text: "",
    type: true,
  });

  const navigate = useNavigate();
  const { id: editID } = useParams();

  // API Hooks
  const {
    run: runFetch,
    data: fetchResponse,
    requestStatus: fetchStatus,
    error: fetchError,
  } = useApiRequest({});

  const fetchProperty = () => editID && runFetch(fetchEditService(editID));

  useEffect(() => {
    fetchProperty();
  }, [editID]);

  const property = useMemo<PropertyEditData | undefined>(() => {
    if (fetchResponse?.status === 200) {
      const data = fetchResponse.data;

      return {
        status: data.status.toLowerCase(),
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
        totalCost: `NGN ${data.total_property_cost}`,
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zip_code,
        country: data.country,
        amenities: data.amenities.filter((item) => item !== ""),
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
        agent: data.agent,
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
      {editID ? (
        <>
          <ApprovePropertyEdit
            show={approve}
            close={() => setApprove(false)}
            id={editID}
            callback={fetchProperty}
          />
          <RejectPropertyEdit
            show={reject}
            close={() => setReject(false)}
            id={editID}
            callback={fetchProperty}
          />
        </>
      ) : (
        ""
      )}

      {property ? (
        <PropertyEditUI
          goBack={goBack}
          handleApprove={() => setApprove(true)}
          handleReject={() => setReject(true)}
          property={property}
        />
      ) : (
        ""
      )}
    </>
  );
};

export { PropertyEdit };
