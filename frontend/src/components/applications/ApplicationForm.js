import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import LoadingSpinner from '../common/LoadingSpinner';
import applicationService from '../../services/applicationService';
import { APPLICATION_STATUS, STATUS_LABELS } from '../../utils/constants';

const ApplicationForm = ({ isEdit = false }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    positionTitle: '',
    applicationDate: '',
    status: APPLICATION_STATUS.APPLIED,
    location: '',
    description: '',
    salaryRange: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      fetchApplication();
    }
  }, [isEdit, id]);

  const fetchApplication = async () => {
    try {
      setInitialLoading(true);
      const application = await applicationService.getApplicationById(id);
      
      setFormData({
        companyName: application.companyName || '',
        positionTitle: application.positionTitle || '',
        applicationDate: application.applicationDate || '',
        status: application.status || APPLICATION_STATUS.APPLIED,
        location: application.location || '',
        description: application.description || '',
        salaryRange: application.salaryRange || '',
        notes: application.notes || '',
      });
    } catch (error) {
      setErrors({ fetch: 'Failed to load application data' });
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.positionTitle.trim()) {
      newErrors.positionTitle = 'Position title is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      if (isEdit) {
        await applicationService.updateApplication(id, formData);
      } else {
        await applicationService.createApplication(formData);
      }
      navigate('/applications');
    } catch (error) {
      setErrors({
        submit: error.error || `Failed to ${isEdit ? 'update' : 'create'} application`
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/applications')}
            className="text-blue-600 hover:text-blue-500 mb-4 inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Applications
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit Application' : 'Add New Application'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEdit ? 'Update your application details' : 'Add a new internship application to track'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          {errors.fetch && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
              <p className="text-sm text-red-600">{errors.fetch}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name and Position Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name *
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border ${errors.companyName ? 'border-red-500' : ''}`}
                  placeholder="e.g., Google, Microsoft, Apple"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label htmlFor="positionTitle" className="block text-sm font-medium text-gray-700">
                  Position Title *
                </label>
                <input
                  id="positionTitle"
                  name="positionTitle"
                  type="text"
                  required
                  value={formData.positionTitle}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border ${errors.positionTitle ? 'border-red-500' : ''}`}
                  placeholder="e.g., Software Engineering Intern"
                />
                {errors.positionTitle && (
                  <p className="mt-1 text-sm text-red-600">{errors.positionTitle}</p>
                )}
              </div>
            </div>

            {/* Application Date and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700">
                  Application Date
                </label>
                <input
                  id="applicationDate"
                  name="applicationDate"
                  type="date"
                  value={formData.applicationDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location and Salary Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                  placeholder="e.g., San Francisco, CA or Remote"
                />
              </div>

              <div>
                <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">
                  Salary Range
                </label>
                <input
                  id="salaryRange"
                  name="salaryRange"
                  type="text"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                  placeholder="e.g., $15-25/hour or $5000/month"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                placeholder="Brief description of the role and responsibilities..."
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                placeholder="Any additional notes, contact information, interview dates, etc..."
              />
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-3 sm:space-y-0 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/applications')}
                className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="small" />
                    <span className="ml-2">
                      {isEdit ? 'Updating...' : 'Creating...'}
                    </span>
                  </>
                ) : (
                  <span>{isEdit ? 'Update Application' : 'Create Application'}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationForm;