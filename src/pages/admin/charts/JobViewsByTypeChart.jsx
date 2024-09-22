import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobViewsByType } from '../../../redux/chartsSlice';
import { Bar } from 'react-chartjs-2';

const JobViewsByTypeChart = () => {
  const dispatch = useDispatch();
  const { jobViewsByType, loading } = useSelector((state) => state.charts);

  useEffect(() => {
    dispatch(fetchJobViewsByType());
  }, [dispatch]);

  const data = {
    labels: jobViewsByType.map((item) => item._id), // Accessing _id for the labels
    datasets: [
      {
        label: 'Job Views',
        data: jobViewsByType.map((item) => item.totalViews), // Accessing totalViews for the data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-center text-xl font-semibold mb-4">Job Views by Type</h2>
      <Bar data={data} />
    </div>
  );
};

export default JobViewsByTypeChart;



