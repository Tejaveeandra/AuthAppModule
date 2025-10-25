import { useState, useCallback } from 'react';
import { saleApi } from '../services/saleApi';

/**
 * Custom hook for orchestrating the entire sale form process
 * This will handle API integration for the complete sale flow
 */
export const useSaleFormOrchestration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: null,
    orientationInfo: null,
    addressInfo: null,
    paymentInfo: null
  });

  // Collect all form data and flatten for API
  const collectAllFormData = useCallback(() => {
    // Flatten the nested structure for API submission
    const flattenedData = {
      // Personal Information
      ...(formData.personalInfo || {}),
      
      // Orientation Information  
      ...(formData.orientationInfo || {}),
      
      // Address Information
      ...(formData.addressInfo || {}),
      
      // Payment Information
      ...(formData.paymentInfo || {}),
      
      // Add metadata
      submissionTimestamp: new Date().toISOString(),
      formVersion: "1.0"
    };
    
    return flattenedData;
  }, [formData]);

  // Validate all forms
  const validateAllForms = useCallback(() => {
    const allData = collectAllFormData();
    
    // Check if all required form sections have data
    const requiredSections = ['personalInfo', 'orientationInfo', 'addressInfo', 'paymentInfo'];
    const missingSections = requiredSections.filter(section => !formData[section]);
    
    if (missingSections.length > 0) {
      throw new Error(`Missing required form sections: ${missingSections.join(', ')}`);
    }
    
    // Validate required fields in flattened data
    const requiredFields = [
      'firstName', 'lastName', 'email', // Personal Info
      'academicYear', 'joiningClass', 'branch', // Orientation Info  
      'doorNo', 'streetName', 'city', 'pincode', // Address Info
      'amount', 'paymentMode' // Payment Info
    ];
    
    const missingFields = requiredFields.filter(field => !allData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    return true;
  }, [collectAllFormData, formData]);

  // Submit complete sale form
  const submitCompleteSale = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate all forms first
      validateAllForms();
      
      // Collect all form data
      const allFormData = collectAllFormData();
      
      console.log('Complete Sale Form Data:', allFormData);
      
      // Call unified API service
      const response = await saleApi.submitCompleteSale(allFormData);
      
      console.log('Sale API response:', response);
      
      setSuccess(true);
      
      return { success: true };
    } catch (err) {
      console.error('Complete sale submission error:', err);
      setError(err.message || 'Sale submission failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  }, [validateAllForms, collectAllFormData]);

  // Update form data for a specific section
  const updateFormData = useCallback((section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  }, []);

  // Reset all form data
  const resetAllFormData = useCallback(() => {
    setFormData({
      personalInfo: null,
      orientationInfo: null,
      addressInfo: null,
      paymentInfo: null
    });
    setError(null);
    setSuccess(false);
    setIsSubmitting(false);
  }, []);

  return {
    isSubmitting,
    error,
    success,
    formData,
    submitCompleteSale,
    updateFormData,
    resetAllFormData,
    collectAllFormData,
    validateAllForms
  };
};
