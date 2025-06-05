import api from './api';

const applicationService = {
  // Get all applications
  getAllApplications: async () => {
    try {
      const response = await api.get('/applications');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch applications' };
    }
  },

  // Get application by ID
  getApplicationById: async (id) => {
    try {
      const response = await api.get(`/applications/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch application' };
    }
  },

  // Create new application
  createApplication: async (applicationData) => {
    try {
      const response = await api.post('/applications', applicationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create application' };
    }
  },

  // Update application
  updateApplication: async (id, applicationData) => {
    try {
      const response = await api.put(`/applications/${id}`, applicationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update application' };
    }
  },

  // Delete application
  deleteApplication: async (id) => {
    try {
      const response = await api.delete(`/applications/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete application' };
    }
  },

  // Get applications by status
  getApplicationsByStatus: async (status) => {
    try {
      const response = await api.get(`/applications/status/${status}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch applications by status' };
    }
  },

  // Search applications by company
  searchApplications: async (company) => {
    try {
      const response = await api.get(`/applications/search?company=${encodeURIComponent(company)}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to search applications' };
    }
  },

  // Get application statistics
  getApplicationStats: async () => {
    try {
      const response = await api.get('/applications/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch statistics' };
    }
  },
};

export default applicationService;