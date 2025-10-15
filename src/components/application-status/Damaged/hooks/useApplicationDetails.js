import { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { fetchApplicationDetails } from "../../../../queries/application-status/apis";
import { findIdByLabel, reverseStatusMap } from "../utils/formUtils";

/**
 * Custom hook for fetching and managing application details
 */
export const useApplicationDetails = ({
  applicationNo,
  isOptionsLoaded,
  dropdownOptions,
  setZoneId,
  setSelectedCampusId,
  setSelectedStatusId,
  setPendingDgmName,
}) => {
  const { setFieldValue } = useFormikContext();
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchApplicationDetailsData = async () => {
      if (applicationNo && isOptionsLoaded) {
        try {
          const data = await fetchApplicationDetails(applicationNo);

          // Map API response to form fields, handling status mapping
          setFieldValue("zoneName", data.zoneName || "");
          setFieldValue("campusName", data.campusName || "");
          setFieldValue("proName", data.proName || "");
          setFieldValue("dgmName", data.dgmEmpName || "");
          const normalizedStatus = data.status?.toLowerCase() || "available";
          const mappedStatus = normalizedStatus === "left" || normalizedStatus === "confirmed" 
            ? "AVAILABLE" 
            : normalizedStatus.toUpperCase();
          setFieldValue("status", mappedStatus);
          setFieldValue("reason", data.reason || "");
          setFieldValue("applicationNo", applicationNo);

          // Store pending DGM name for later processing
          if (data.dgmEmpName) {
            setPendingDgmName(data.dgmEmpName);
          }

          // Set IDs based on labels
          const zoneId = findIdByLabel(dropdownOptions.zoneName, data.zoneName, "zoneName");
          const campusId = findIdByLabel(dropdownOptions.campusName, data.campusName, "campusName");
          const proId = findIdByLabel(dropdownOptions.proName, data.proName, "proName");
          const dgmId = findIdByLabel(dropdownOptions.dgmName, data.dgmEmpName, "dgmName");
          const statusId = findIdByLabel(dropdownOptions.status, mappedStatus, "status");

          setFieldValue("zoneId", zoneId || "");
          setFieldValue("campusId", campusId || "");
          setFieldValue("proId", proId || "");
          setFieldValue("dgmEmpId", dgmId || "");
          setFieldValue("statusId", statusId || "");

          setZoneId(zoneId || "");
          setSelectedCampusId(campusId || "");
          setSelectedStatusId(statusId || "");

          setFetchError(false);
        } catch (err) {
          console.error("Failed to fetch application details:", err);
          setFetchError(true);
        }
      } else if (!applicationNo) {
        // Clear form when no application number
        setFieldValue("zoneName", "");
        setFieldValue("campusName", "");
        setFieldValue("proName", "");
        setFieldValue("dgmName", "");
        setFieldValue("status", "");
        setFieldValue("reason", "");
        setFieldValue("zoneId", "");
        setFieldValue("campusId", "");
        setFieldValue("proId", "");
        setFieldValue("dgmEmpId", "");
        setFieldValue("statusId", "");
        setZoneId("");
        setSelectedCampusId("");
        setSelectedStatusId(null);
        setPendingDgmName("");
        setFetchError(false);
      }
    };

    fetchApplicationDetailsData();
  }, [
    applicationNo,
    isOptionsLoaded,
    setFieldValue,
    dropdownOptions.zoneName,
    dropdownOptions.campusName,
    dropdownOptions.proName,
    dropdownOptions.dgmName,
    dropdownOptions.status,
    setZoneId,
    setSelectedCampusId,
    setSelectedStatusId,
    setPendingDgmName,
  ]);

  return { fetchError };
};
