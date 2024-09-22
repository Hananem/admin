import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteJob } from '../../redux/jobSlice';

const DeleteJobModal = ({ isOpen, closeModal, job }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (job) {
      dispatch(deleteJob(job._id));
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this job?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-primary"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteJobModal;
