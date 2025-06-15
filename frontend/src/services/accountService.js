import api from './api';

const accountService = {
  // Delete user account
  deleteAccount: async (password) => {
    try {
      const response = await api.delete('/user/account', {
        data: { password }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete account' };
    }
  },

  // Export user data
  exportData: async () => {
    try {
      const response = await api.get('/user/export');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to export data' };
    }
  },
};

export default accountService;