import React from 'react';

const DeleteBlogModal = ({ isOpen, closeModal, handleDelete, blog }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Delete Blog</h2>
        <p>Are you sure you want to delete the blog titled "{blog?.title}"?</p>
        {blog?.image && (
          <div className="mt-4">
            <img src={blog.image} alt={blog.title} className="w-32 h-32 object-cover rounded-lg" />
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button onClick={closeModal} className="btn btn-secondary-light mr-2">Cancel</button>
          <button onClick={handleDelete} className="btn btn-danger-light">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
