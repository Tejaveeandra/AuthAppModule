/**
 * Utility functions for form data processing and validation
 */

/**
 * Normalize strings for matching by trimming, lowercasing, and removing special characters
 * @param {string} str - String to normalize
 * @returns {string} Normalized string
 */
export const normalizeString = (str) =>
  str
    ?.trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9\s]/g, "") || "";

/**
 * Find ID by label in dropdown options
 * @param {Array} options - Array of dropdown options
 * @param {string} label - Label to search for
 * @param {string} fieldName - Name of the field for error logging
 * @returns {string|null} Found ID or null
 */
export const findIdByLabel = (options, label, fieldName) => {
  if (!Array.isArray(options) || !options.length || !label) {
    console.warn(`No valid label or options for ${fieldName}:`, { label, options });
    return null;
  }
  
  const normalizedLabel = normalizeString(label);
  const match = options.find((opt) => normalizeString(opt.label) === normalizedLabel);
  
  if (!match) {
    console.warn(
      `No exact match for ${fieldName} label: "${label}" (normalized: "${normalizedLabel}") in options:`,
      options.map((opt) => opt.label)
    );
    return null;
  }
  
  return match.value || null;
};

/**
 * Status mapping for reverse lookup
 */
export const reverseStatusMap = {
  damaged: "DAMAGED",
  withpro: "AVAILABLE",
  "not confirmed": "UNSOLD",
  "with pro": "AVAILABLE",
  with_pro: "AVAILABLE",
  available: "AVAILABLE",
  unsold: "UNSOLD",
  "not sold": "UNSOLD",
  notsold: "UNSOLD",
  "un sold": "UNSOLD",
  approved: "CONFIRMED",
  broken: "DAMAGED",
  "": "UNKNOWN",
};

/**
 * Map API data to dropdown options format
 * @param {Array} data - Raw API data
 * @param {string} labelField - Field name for label
 * @param {string} valueField - Field name for value
 * @param {string} fallbackLabel - Fallback label if label is missing
 * @returns {Array} Mapped dropdown options
 */
export const mapToDropdownOptions = (data, labelField, valueField, fallbackLabel = "Unknown") => {
  if (!Array.isArray(data)) return [];
  
  return data
    .map((item) => ({
      label: item[labelField]?.trim() || fallbackLabel,
      value: item[valueField] || null,
    }))
    .filter((opt) => opt.label && opt.value);
};

/**
 * Validate form submission data
 * @param {Object} values - Form values
 * @param {Object} dropdownOptions - Available dropdown options
 * @returns {Object} Validation result with isValid and missingIds
 */
export const validateSubmissionData = (values, dropdownOptions) => {
  const updatedValues = {
    applicationNo: parseInt(values.applicationNo, 10) || 0,
    statusId: findIdByLabel(dropdownOptions.status, values.status, "status") || null,
    reason: values.reason,
    campusId: findIdByLabel(dropdownOptions.campusName, values.campusName, "campusName") || null,
    proId: findIdByLabel(dropdownOptions.proName, values.proName, "proName") || null,
    zoneId: findIdByLabel(dropdownOptions.zoneName, values.zoneName, "zoneName") || null,
    dgmEmpId: findIdByLabel(dropdownOptions.dgmName, values.dgmName, "dgmName") || null,
  };

  const missingIds = [];
  if (!updatedValues.statusId || isNaN(updatedValues.statusId)) missingIds.push("statusId");
  if (!updatedValues.campusId || isNaN(updatedValues.campusId)) missingIds.push("campusId");
  if (!updatedValues.proId) missingIds.push("proId");
  if (!updatedValues.zoneId || isNaN(updatedValues.zoneId)) missingIds.push("zoneId");
  if (!updatedValues.dgmEmpId) missingIds.push("dgmEmpId");

  return {
    isValid: missingIds.length === 0,
    missingIds,
    updatedValues,
  };
};
