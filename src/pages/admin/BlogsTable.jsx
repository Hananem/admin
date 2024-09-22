import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, deleteBlogById } from '../../redux/blogSlice'; // Import the actions
import DeleteBlogModal from './DeleteBlogModal';
import UpdateBlogModal from './UpdateBlogModal';

const BlogsTable = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.user?.token);
  const { blogs, status, error } = useSelector((state) => state.blogs);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogs({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBlog(null);
  };

  const openUpdateModal = (blog) => {
    setSelectedBlog(blog);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedBlog(null);
  };

  const handleDelete = () => {
    if (selectedBlog && token) {
      dispatch(deleteBlogById({ id: selectedBlog._id, token }));
    }
    closeDeleteModal();
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <table className="min-w-full bg-white dark:bg-dark-card border rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Image</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Title</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Date</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="hover:bg-gray-100 dark:hover:bg-hover-color">
              <td className="px-4 py-2 border-b dark:border-hover-color">
                <img src={blog.image.url} alt={blog.title} className="w-16 h-16 object-cover rounded-lg" />
              </td>
              <td className="px-4 py-2 border-b dark:border-hover-color">{blog.title}</td>
              <td className="px-4 py-2 border-b dark:border-hover-color">
                <button
                  onClick={() => openUpdateModal(blog)}
                  className="btn btn-primary-light mr-2">
                  Update
                </button>
                <button
                  onClick={() => openDeleteModal(blog)}
                  className="btn btn-danger-light">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteBlogModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
        blog={selectedBlog}
      />

      <UpdateBlogModal
        isOpen={isUpdateModalOpen}
        closeModal={closeUpdateModal}
        blog={selectedBlog}
      />
    </div>
  );
};

export default BlogsTable;
