import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataVisualization = ({ apodData, marsData, epicData }) => {
  // Transform your data for visualization
  const processData = () => {
    return [
      {
        name: 'APOD',
        images: apodData ? 1 : 0,
        favorites: 0 // Add your actual metric
      },
      {
        name: 'Mars Rover',
        images: marsData?.photos?.length || 0,
        favorites: 0 // Add your actual metric
      },
      {
        name: 'EPIC',
        images: epicData?.length || 0,
        favorites: 0 // Add your actual metric
      }
    ];
  };

  const chartData = processData();

  return (
    <div className="data-viz-container p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-200">
        NASA Data Overview
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="images" fill="#8884d8" name="Images Available" />
            <Bar dataKey="favorites" fill="#82ca9d" name="User Favorites" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        Visualization showing available NASA images across different APIs
      </p>
    </div>
  );
};

export default DataVisualization;