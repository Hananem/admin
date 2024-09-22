import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../../redux/eventsSlice'; // Adjust import according to your directory structure
import { useNavigate } from 'react-router-dom';
import { FaImage } from "react-icons/fa6";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formError, setFormError] = useState('');
  const token = useSelector((state) => state.user?.user?.token); // Assuming token is stored in user state

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!title || !description || !date || !location || !companyName) {
      setFormError('All fields are required');
      return;
    }

    const eventData = {
      title,
      description,
      date,
      location,
      companyName,
      logo,
    };

    dispatch(addEvent({ eventData, token }))
      .unwrap()
      .then(() => {
        navigate('/'); // Navigate to the events list or wherever you want
      })
      .catch((err) => {
        setFormError(err.message || 'Failed to create event');
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Create New Event</h1>
      
      {formError && <div className="text-red-500 mb-4">{formError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Event Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">Event Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="logo" className="block text-gray-700">Company Logo</label>
          <div className="relative mt-1">
            <input
              type="file"
              id="logo"
              onChange={handleLogoChange}
              className="block w-full text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Company Logo"
                  className="w-32 h-32 object-cover border border-gray-300 rounded-md"
                />
              ) : (
                <FaImage className="text-gray-400 text-6xl" />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;

