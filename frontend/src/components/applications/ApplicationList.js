import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import LoadingSpinner from '../common/LoadingSpinner';
import applicationService from '../../services/applicationService';
import DeleteConfirmModal from '../common/DeleteConfirmModal';
import { APPLICATION_STATUS, STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, applicationId: null, companyName: '' });
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterAndSortApplications();
  }, [applications, searchTerm, statusFilter, sortBy]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getAllApplications();
      setApplications(data);
    } catch (err) {
      setError('Failed to load applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortApplications = () => {
    let filtered = applications;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.positionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Sort applications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'company':
          return a.companyName.localeCompare(b.companyName);
        case 'position':
          return a.positionTitle.localeCompare(b.positionTitle);
        case 'date':
          return new Date(b.applicationDate || b.createdAt) - new Date(a.applicationDate || a.createdAt);
        default:
          return 0;
      }
    });

    setFilteredApplications(filtered);
  };

  const handleDeleteClick = (id, companyName, positionTitle) => {
  setDeleteModal({
    isOpen: true,
    applicationId: id,
    companyName: companyName,
    positionTitle: positionTitle
  });
};

const handleDeleteConfirm = async () => {
  try {
    setDeleteLoading(deleteModal.applicationId);
    await applicationService.deleteApplication(deleteModal.applicationId);
    setApplications(prev => prev.filter(app => app.id !== deleteModal.applicationId));
    setDeleteModal({ isOpen: false, applicationId: null, companyName: '', positionTitle: '' });
  } catch (err) {
    alert('Failed to delete application');
    console.error('Error deleting application:', err);
  } finally {
    setDeleteLoading(null);
  }
};

const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, applicationId: null, companyName: '', positionTitle: '' });
};

  const handleStatusChange = async (id, newStatus) => {
    try {
      const application = applications.find(app => app.id === id);
      const updatedApp = { ...application, status: newStatus };
      await applicationService.updateApplication(id, updatedApp);
      
      setApplications(prev =>
        prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
      );
    } catch (err) {
      alert('Failed to update status');
      console.error('Error updating status:', err);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="large" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchApplications}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600 mt-1">
              Manage your internship applications ({applications.length} total)
            </p>
          </div>
          <Link
            to="/applications/new"
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Application
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by company, position, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              >
                <option value="ALL">All Statuses</option>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="company">Company A-Z</option>
                <option value="position">Position A-Z</option>
                <option value="date">Application Date</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          {(searchTerm || statusFilter !== 'ALL') && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredApplications.length} of {applications.length} applications
            </div>
          )}
        </div>

        {/* Applications Grid/List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 border border-gray-200 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {applications.length === 0 ? 'No applications yet' : 'No applications found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {applications.length === 0 
                ? 'Start tracking your internship applications by adding your first one.'
                : 'Try adjusting your search or filter criteria.'
              }
            </p>
            {applications.length === 0 && (
              <Link
                to="/applications/new"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Your First Application
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div key={application.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {application.positionTitle}
                        </h3>
                        <p className="text-blue-600 font-medium mb-2">
                          {application.companyName}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          {application.location && (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {application.location}
                            </div>
                          )}
                          {application.salaryRange && (
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              {application.salaryRange}
                            </div>
                          )}
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0v1a6 6 0 1012 0V7m-6 0H8" />
                            </svg>
                            {new Date(application.applicationDate || application.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="sm:ml-4">
                        <select
                          value={application.status}
                          onChange={(e) => handleStatusChange(application.id, e.target.value)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${STATUS_COLORS[application.status]}`}
                        >
                          {Object.entries(STATUS_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    {application.description && (
                      <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                        {application.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 mt-4 lg:mt-0 lg:ml-6">
                    <button
                      onClick={() => navigate(`/applications/${application.id}`)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition duration-200"
                      title="View Details"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => navigate(`/applications/${application.id}/edit`)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition duration-200"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                        onClick={() => handleDeleteClick(application.id, application.companyName, application.positionTitle)}
                        disabled={deleteLoading === application.id}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition duration-200 disabled:opacity-50"
                        title="Delete"
                    >
                      {deleteLoading === application.id ? (
                        <LoadingSpinner size="small" />
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  
                  </div>
               </div>
             </div>
           ))}
         </div>
       )}
       {/* Delete Confirmation Modal */}
<DeleteConfirmModal
  isOpen={deleteModal.isOpen}
  onClose={handleDeleteCancel}
  onConfirm={handleDeleteConfirm}
  loading={deleteLoading === deleteModal.applicationId}
  title="Delete Application"
  message="Are you sure you want to delete this application?"
  itemName={deleteModal.positionTitle ? `${deleteModal.positionTitle} at ${deleteModal.companyName}` : deleteModal.companyName}
  confirmText="Delete Application"
  cancelText="Cancel"
/>
     </div>
   </Layout>
 );
};

export default ApplicationList;