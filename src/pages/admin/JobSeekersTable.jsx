import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobSeekers, deleteJobSeekerPost } from '../../redux/jobSeekerPostsSlice';
import { FaTrash } from 'react-icons/fa';
import DeleteJobSeekerModal from './DeleteJobSeekerModal'; // Import the DeleteJobSeekerModal component

const JobSeekersTable = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.jobSeekerPosts);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);

  useEffect(() => {
    dispatch(fetchAllJobSeekers({ page: 1, limit: 10 })); // Adjust page and limit as needed
  }, [dispatch]);

  const handleDelete = (jobSeeker) => {
    setSelectedJobSeeker(jobSeeker);
    setIsDeleteModalOpen(true);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Job Seekers</h2>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Profile Photo</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Job Title</th>
            <th className="border px-4 py-2">Education Level</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((jobSeeker) => (
            <tr key={jobSeeker._id}>
              <td className="border px-4 py-2">
                {jobSeeker.profilePhoto && (
                  <img
                    src={jobSeeker.profilePhoto}
                    alt={jobSeeker.username}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                )}
              </td>
              <td className="border px-4 py-2">{jobSeeker.username}</td>
              <td className="border px-4 py-2">{jobSeeker.jobTitle}</td>
              <td className="border px-4 py-2">{jobSeeker.educationLevel}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleDelete(jobSeeker)}
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
      <DeleteJobSeekerModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        jobSeeker={selectedJobSeeker}
      />
    </div>
  );
};

export default JobSeekersTable;
