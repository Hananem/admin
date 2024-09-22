import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobApplicationsByType } from '../../../redux/chartsSlice';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JobApplicationsByTypeChart = () => {
  const dispatch = useDispatch();
  const { jobApplicationsByType, loading } = useSelector((state) => state.charts);

  useEffect(() => {
    dispatch(fetchJobApplicationsByType());
  }, [dispatch]);

  const data = {
    labels: jobApplicationsByType.map((item) => item.type),
    datasets: [
      {
        label: 'Job Applications',
        data: jobApplicationsByType.map((item) => item.applications),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-center text-xl font-semibold mb-4">Job Applications by Type</h2>
      <Bar data={data} />
    </div>
  );
};

export default JobApplicationsByTypeChart;

