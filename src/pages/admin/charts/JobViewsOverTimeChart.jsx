import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobViewsOverTime } from '../../../redux/chartsSlice';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components for Line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const JobViewsOverTimeChart = () => {
  const dispatch = useDispatch();
  const { jobViewsOverTime, loading } = useSelector((state) => state.charts);

  useEffect(() => {
    dispatch(fetchJobViewsOverTime());
  }, [dispatch]);

  const data = {
    labels: jobViewsOverTime.map((item) => item.date),
    datasets: [
      {
        label: 'Job Views Over Time',
        data: jobViewsOverTime.map((item) => item.views),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
        tension: 0.3, // smooth line curve
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Job Views Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Views',
        },
      },
    },
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-center text-xl font-semibold mb-4">Job Views Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default JobViewsOverTimeChart;
