import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUser } from '../../redux/profileSlice'; // Import the actions
import DeleteUserModal from './DeleteUserModal';

const UserTable = () => {
    const dispatch = useDispatch();
    
    // Access the token from the user state
    const token = useSelector((state) => state.user?.user?.token);
    
    // Access the profile slice for users and error/loading state
    const { users, loading, error } = useSelector((state) => state.profile);
  
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // Fetch users on component mount
    useEffect(() => {
      dispatch(fetchAllUsers());
    }, [dispatch]);
  
    const openModal = (user) => {
      setSelectedUser(user);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedUser(null);
    };
  
    const handleDelete = () => {
      if (selectedUser && token) {
        // Dispatch deleteUser action with the selected user's ID and token
        dispatch(deleteUser({ id: selectedUser._id, token }));
      }
      closeModal();
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
  return (
    <div className="container mx-auto p-6">
      <table className="min-w-full bg-white dark:bg-dark-card border rounded-lg">
        <thead>
          <tr>
          <th className="px-4 py-2 text-left border-b dark:border-hover-color">Profile Photo</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Name</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Job Title</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Email</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100 dark:hover:bg-hover-color">
              {/* Profile Photo */}
              <td className="px-4 py-2 border-b dark:border-hover-color">
                <img
                  src={user.profilePhoto.url}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>

              {/* Name */}
              <td className="px-4 py-2 border-b dark:border-hover-color">{user.username}</td>

              {/* Job Title */}
              <td className="px-4 py-2 border-b dark:border-hover-color">{user.jobTitle || 'Not provided'}</td>

              {/* Email */}
              <td className="px-4 py-2 border-b dark:border-hover-color">{user.email}</td>

              {/* Actions */}
              <td className="px-4 py-2 border-b dark:border-hover-color">
                <button
                  onClick={() => openModal(user)}
                  className="btn btn-primary-light">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete User Modal */}
      <DeleteUserModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleDelete={handleDelete}
        user={selectedUser}
      />
    </div>
  );
};

export default UserTable;
