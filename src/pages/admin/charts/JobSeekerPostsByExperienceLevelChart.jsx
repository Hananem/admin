import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobSeekerPostsByExperienceLevel } from '../../../redux/chartsSlice';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const JobSeekerPostsByExperienceLevelChart = () => {
  const dispatch = useDispatch();
  const { jobSeekerPostsByExperienceLevel, loading } = useSelector((state) => state.charts);

  useEffect(() => {
    dispatch(fetchJobSeekerPostsByExperienceLevel());
  }, [dispatch]);

  const data = {
    labels: jobSeekerPostsByExperienceLevel.map((item) => item._id), // Experience Level (_id field)
    datasets: [
      {
        label: 'Posts by Experience Level',
        data: jobSeekerPostsByExperienceLevel.map((item) => item.count), // Post count
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-center text-xl font-semibold mb-4">Posts by Experience Level</h2>
      <Pie data={data} />
    </div>
  );
};

export default JobSeekerPostsByExperienceLevelChart;

