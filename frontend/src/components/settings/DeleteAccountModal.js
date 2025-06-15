import React, { useState } from 'react';
import Modal from '../common/Modal';
import LoadingSpinner from '../common/LoadingSpinner';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm, loading = false }) => {
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    
    if (!password) {
      newErrors.password = 'Password is required to delete your account';
    }
    
    if (confirmText !== 'DELETE') {
      newErrors.confirmText = 'You must type "DELETE" to confirm';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onConfirm(password);
  };

  const handleClose = () => {
    setPassword('');
    setConfirmText('');
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Delete Account">
      <div className="space-y-6">
        {/* Warning */}
        <div className="flex items-center justify-center">
          <div className="bg-red-100 rounded-full p-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        {/* Warning Text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Are you absolutely sure?
          </h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-800 font-medium mb-2">
              This action cannot be undone. This will permanently:
            </p>
            <ul className="text-sm text-red-700 text-left space-y-1">
              <li>• Delete your account and profile</li>
              <li>• Remove all your internship applications</li>
              <li>• Delete all your notes and data</li>
              <li>• Revoke access to AppTrack By Adil</li>
            </ul>
          </div>
        </div>

        {/* Confirmation Form */}
        <div className="space-y-4">
          {/* Password Confirmation */}
          <div>
            <label htmlFor="delete-password" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your password to confirm
            </label>
            <input
              id="delete-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
              }}
              className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2 border ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
              disabled={loading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Type DELETE Confirmation */}
          <div>
            <label htmlFor="delete-confirm" className="block text-sm font-medium text-gray-700 mb-1">
              Type <span className="font-bold text-red-600">DELETE</span> to confirm
            </label>
            <input
              id="delete-confirm"
              type="text"
              value={confirmText}
              onChange={(e) => {
                setConfirmText(e.target.value);
                if (errors.confirmText) setErrors(prev => ({ ...prev, confirmText: '' }));
              }}
              className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2 border ${errors.confirmText ? 'border-red-500' : ''}`}
              placeholder="Type DELETE here"
              disabled={loading}
            />
            {errors.confirmText && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmText}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-3 sm:space-y-0 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" />
                <span className="ml-2">Deleting Account...</span>
              </>
            ) : (
              'Delete My Account'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;