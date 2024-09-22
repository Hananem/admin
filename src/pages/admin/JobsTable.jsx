import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, deleteJob } from '../../redux/jobSlice';
import { FaTrash } from 'react-icons/fa';
import DeleteJobModal from './DeleteJobModal'; // Import the DeleteJobModal component

const JobTable = () => {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleDelete = (job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Jobs</h2>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Company Logo</th>
            <th className="border px-4 py-2">Company Name</th>
            <th className="border px-4 py-2">Job Title</th>
            <th className="border px-4 py-2">Job Type</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td className="border px-4 py-2">
                {job.company?.logo?.url && (
                  <img
                    src={job.company.logo.url}
                    alt={job.companyName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
              </td>
              <td className="border px-4 py-2">{job.companyName}</td>
              <td className="border px-4 py-2">{job.jobTitle}</td>
              <td className="border px-4 py-2">{job.jobType}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleDelete(job)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal component */}
      <DeleteJobModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default JobTable;
