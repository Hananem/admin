import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRegistrationsOverTime } from '../../../redux/chartsSlice';
import { Line } from 'react-chartjs-2';

const UserRegistrationsOverTimeChart = () => {
  const dispatch = useDispatch();
  const { userRegistrationsOverTime, loading } = useSelector((state) => state.charts);

  useEffect(() => {
    dispatch(fetchUserRegistrationsOverTime());
  }, [dispatch]);

  const data = {
    labels: userRegistrationsOverTime.map((item) => item._id), // Accessing _id for dates
    datasets: [
      {
        label: 'User Registrations',
        data: userRegistrationsOverTime.map((item) => item.totalRegistrations), // Accessing totalRegistrations for the data
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-center text-xl font-semibold mb-4">User Registrations Over Time</h2>
      <Line data={data} />
    </div>
  );
};

export default UserRegistrationsOverTimeChart;


