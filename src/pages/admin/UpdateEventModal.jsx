import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateEvent } from '../../redux/eventsSlice';

const UpdateEventModal = ({ isOpen, closeModal, event }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    companyName: '',
    logo: null,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date || '',
        location: event.location || '',
        companyName: event.company.name || '',
        logo: null,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEvent({ id: event._id, eventData: formData, token: 'YOUR_TOKEN' }));
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Event</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Company Name:
            <input
              type="text"
              name="companyName"
              value={formData.company.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </label>
          <label className="block mb-4">
            Logo:
            <input
              type="file"
              name="logo"
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventModal;
