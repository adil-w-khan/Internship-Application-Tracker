import React from 'react';
import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  loading = false,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  itemName = "",
  confirmText = "Delete",
  cancelText = "Cancel"
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        {/* Warning Icon */}
        <div className="flex items-center justify-center">
          <div className="bg-red-100 rounded-full p-3">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="text-center">
          <p className="text-gray-900 mb-2">
            {message}
          </p>
          {itemName && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">"{itemName}"</span> will be permanently deleted.
            </p>
          )}
          <p className="text-sm text-red-600 mt-2">
            This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-3 sm:space-y-0 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" />
                <span className="ml-2">Deleting...</span>
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;