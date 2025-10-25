import { useState, useEffect } from 'react';
import { saleApi } from '../../services/saleApi';

export const useDropdownData = () => {
  const [quotaOptions, setQuotaOptions] = useState([]);
  const [admissionReferredByOptions, setAdmissionReferredByOptions] = useState([]);
  const [admissionTypeOptions, setAdmissionTypeOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [authorizedByOptions, setAuthorizedByOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDropdownData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch quotas first (this is working)
      let quotas = [];
      let admissionReferredBy = [];
      let admissionTypes = [];
      let genders = [];
      let authorizedBy = [];

      try {
        quotas = await saleApi.getQuotas();
      } catch (err) {
        console.error('Error fetching quotas:', err);
      }

      // Try to fetch admission referred by (this is failing with 500)
      try {
        admissionReferredBy = await saleApi.getAdmissionReferredBy();
      } catch (err) {
        console.error('Error fetching admission referred by:', err);
        // Use empty array as fallback
        admissionReferredBy = [];
      }

      // Try to fetch admission types
      try {
        admissionTypes = await saleApi.getAdmissionTypes();
        console.log('=== ADMISSION TYPES SUCCESS ===');
        console.log('Raw admissionTypes response:', admissionTypes);
        console.log('AdmissionTypes response length:', admissionTypes.length);
        console.log('First admissionType item:', admissionTypes[0]);
        console.log('=== END ADMISSION TYPES SUCCESS ===');
      } catch (err) {
        console.error('Error fetching admission types:', err);
        console.log('AdmissionTypes API call failed:', err.message);
        // Use empty array as fallback
        admissionTypes = [];
      }

      // Try to fetch genders
      try {
        genders = await saleApi.getGenders();
      } catch (err) {
        console.error('Error fetching genders:', err);
        // Use empty array as fallback
        genders = [];
      }

      // Try to fetch authorized by options
      try {
        authorizedBy = await saleApi.getAuthorizedBy();
      } catch (err) {
        console.error('Error fetching authorized by:', err);
        // Use empty array as fallback
        authorizedBy = [];
      }

      // Transform the data to match your dropdown format
      const transformedQuotas = quotas.map(item => ({
        value: item.quota_id || item.id,
        label: item.quota_name || item.name || item.quotaName || item.title
      }));

      const transformedAdmissionReferredBy = admissionReferredBy.map(item => ({
        value: item.emp_id || item.id,
        label: item.emp_name || item.name || item.employeeName || item.title
      }));

      const transformedAdmissionTypes = admissionTypes.map(item => ({
        value: item.adms_type_id || item.id,
        label: item.adms_type_name || item.name || item.typeName || item.title
      }));

      console.log('=== TRANSFORMED ADMISSION TYPES DEBUG ===');
      console.log('Transformed admissionTypes:', transformedAdmissionTypes);
      console.log('Transformed admissionTypes length:', transformedAdmissionTypes.length);
      console.log('=== END TRANSFORMED ADMISSION TYPES DEBUG ===');

      const transformedGenders = genders.map(item => ({
        value: item.gender_id || item.id,
        label: item.gender_name || item.name || item.genderName || item.title
      }));

      const transformedAuthorizedBy = authorizedBy.map(item => ({
        value: item.emp_id || item.id,
        label: item.emp_name || item.name || item.employeeName || item.title
      }));

      setQuotaOptions(transformedQuotas);
      setAdmissionReferredByOptions(transformedAdmissionReferredBy);
      setAdmissionTypeOptions(transformedAdmissionTypes);
      setGenderOptions(transformedGenders);
      setAuthorizedByOptions(transformedAuthorizedBy);

    } catch (err) {
      console.error('Error fetching dropdown data:', err);
      setError(err.message);
      
      // Fallback to empty arrays or default options
      setQuotaOptions([]);
      setAdmissionReferredByOptions([]);
      setAdmissionTypeOptions([]);
      setGenderOptions([]);
      setAuthorizedByOptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  return {
    quotaOptions,
    admissionReferredByOptions,
    admissionTypeOptions,
    genderOptions,
    authorizedByOptions,
    loading,
    error,
    refetch: fetchDropdownData
  };
};
