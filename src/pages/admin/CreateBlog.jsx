import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../redux/blogSlice'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React Quill's CSS
import { FaImage } from "react-icons/fa6";
const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user); // Access token from user state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // Content will be handled by React Quill
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }

    const blogData = {
      title,
      description: content, // React Quill's content
      image,
    };

    try {
      await dispatch(createBlog({ blogData, token })).unwrap();
      navigate('/blogs'); // Redirect to the blogs page or another page upon success
    } catch (error) {
      setError('Failed to create blog. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <ReactQuill
            id="content"
            value={content}
            onChange={setContent}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            theme="snow"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
          {image ? (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-auto rounded-md"
              />
            </div>
          ) : (
            <FaImage/>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;

