import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlogById, updateBlogImageById } from '../../redux/blogSlice';

const UpdateBlogModal = ({ isOpen, closeModal, blog }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageFile: null,
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        imageFile: null,
      });
    }
  }, [blog]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });
    if (files) setFormData({ ...formData, imageFile: files[0] });
  };

  const handleSubmit = () => {
    if (blog) {
      if (formData.imageFile) {
        dispatch(updateBlogImageById({ id: blog._id, imageFile: formData.imageFile, token: '' }));
      }
      dispatch(updateBlogById({ id: blog._id, blogData: formData, token: '' }));
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Blog</h2>
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
          />
        </div>
    
        <div className="mt-4">
          <label className="block mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="textarea"
          ></textarea>
        </div>
        <div className="mt-4">
          <label className="block mb-2">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="input"
          />
        </div>
        {blog?.image && (
          <div className="mt-4">
            <img src={blog.image} alt={blog.title} className="w-32 h-32 object-cover rounded-lg" />
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button onClick={closeModal} className="btn btn-secondary-light mr-2">Cancel</button>
          <button onClick={handleSubmit} className="btn btn-primary-light">Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlogModal;
