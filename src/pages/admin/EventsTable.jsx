import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '../../redux/eventsSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UpdateEventModal from './UpdateEventModal';
import DeleteEventModal from './DeleteEventModal';

const EventsTable = () => {
  const dispatch = useDispatch();
  const { events, status, error } = useSelector((state) => state.events);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchAllEvents({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setIsUpdateModalOpen(true);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Events</h2>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Company Logo</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Company</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td className="border px-4 py-2">
                {event.company?.logo?.url && (
                  <img
                    src={event.company.logo.url}
                    alt={event.company.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
              </td>
              <td className="border px-4 py-2">{event.title}</td>
              <td className="border px-4 py-2">{event.description}</td>
              <td className="border px-4 py-2">{new Date(event.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{event.location}</td>
              <td className="border px-4 py-2">{event.company.name}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <button onClick={() => handleUpdate(event)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit size={20} />
                </button>
                <button onClick={() => handleDelete(event)} className="text-red-500 hover:text-red-700">
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal components */}
      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        closeModal={() => setIsUpdateModalOpen(false)}
        event={selectedEvent}
      />
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default EventsTable;
