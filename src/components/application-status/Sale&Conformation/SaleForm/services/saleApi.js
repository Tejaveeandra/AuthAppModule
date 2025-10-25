import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Sale API service for complete sale form submission
 * Real API integration with backend
 */
export const saleApi = {
  /**
   * Get quotas from backend
   * @returns {Promise<Array>} List of quotas
   */
  async getQuotas() {
    try {
      const response = await apiClient.get('/student-admissions-sale/quotas');
      return response.data;
    } catch (error) {
      console.error('Get quotas error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch quotas');
    }
  },

  /**
   * Get admission referred by options from backend
   * @returns {Promise<Array>} List of admission referred by options
   */
  async getAdmissionReferredBy() {
    try {
      const response = await apiClient.get('/student-admissions-sale/admission-referred-by');
      return response.data;
    } catch (error) {
      console.error('Get admission referred by error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch admission referred by options');
    }
  },

  /**
   * Get admission types from backend
   * @returns {Promise<Array>} List of admission types
   */
  async getAdmissionTypes() {
    try {
      const response = await apiClient.get('/student-admissions-sale/admission-types');
      return response.data;
    } catch (error) {
      console.error('Get admission types error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch admission types');
    }
  },

  /**
   * Get genders from backend
   * @returns {Promise<Array>} List of genders
   */
  async getGenders() {
    try {
      const response = await apiClient.get('/student-admissions-sale/genders');
      return response.data;
    } catch (error) {
      console.error('Get genders error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch genders');
    }
  },

  /**
   * Get authorized by options from backend
   * @returns {Promise<Array>} List of authorized by options
   */
  async getAuthorizedBy() {
    try {
      const response = await apiClient.get('/student-admissions-sale/authorizedBy/all');
      return response.data;
    } catch (error) {
      console.error('Get authorized by error:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch authorized by options');
    }
  },

  /**
   * Submit complete sale form data
   * @param {Object} saleData - Flattened sale form data
   * @returns {Promise<Object>} API response
   */
  async submitCompleteSale(saleData) {
    try {
      const response = await apiClient.post('/student-admissions-sale/submit', saleData);
      return response.data;
    } catch (error) {
      console.error('Sale submission error:', error);
      throw new Error(error.response?.data?.message || 'Sale submission failed');
    }
  },

  /**
   * Submit individual form section (for step-by-step saving)
   * @param {string} section - Form section name
   * @param {Object} data - Form data
   * @returns {Promise<Object>} API response
   */
  async submitFormSection(section, data) {
    try {
      const response = await apiClient.post(`/student-admissions-sale/${section}`, data);
      return response.data;
    } catch (error) {
      console.error(`${section} submission error:`, error);
      throw new Error(error.response?.data?.message || `${section} submission failed`);
    }
  },

  /**
   * Validate form section
   * @param {string} section - Form section name
   * @param {Object} data - Form data
   * @returns {Promise<Object>} Validation response
   */
  async validateFormSection(section, data) {
    try {
      const response = await apiClient.post(`/student-admissions-sale/validate/${section}`, data);
      return response.data;
    } catch (error) {
      console.error(`${section} validation error:`, error);
      throw new Error(error.response?.data?.message || `${section} validation failed`);
    }
  }
};