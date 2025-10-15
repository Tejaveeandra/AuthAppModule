import React from "react";
import SuccessPage from "../../ConformationPage/SuccessPage";

/**
 * Wrapper component for the success page
 */
const SuccessPageWrapper = ({ submittedData, onBack }) => {
  if (!submittedData) return null;

  // Determine if we should show reverse order
  // If status is "AVAILABLE" or "WITH PRO", show reverse order (Red star first, Blue star second)
  const shouldReverseOrder = submittedData.status === "AVAILABLE" || submittedData.status === "WITH PRO";
  
  return (
    <SuccessPage
      applicationNo={submittedData.applicationNo}
      studentName={submittedData.proName} // Using PRO name as student name
      amount="" // No amount for damaged status
      campus={submittedData.campusName}
      zone={submittedData.zoneName}
      onBack={onBack}
      statusType="damaged"
      reverseOrder={shouldReverseOrder}
    />
  );
};

export default SuccessPageWrapper;
