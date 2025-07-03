import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default function MarsPhotoChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchMarsPhotos() {
      try {
        const res = await axios.get('https://nasa-explorer-012v.onrender.com/api/mars?date=2025-06-03');
        const photos = res.data.photos;

        // Count photos by camera name
        const cameraCounts = {};
        photos.forEach(photo => {
          const camera = photo.camera.full_name;
          cameraCounts[camera] = (cameraCounts[camera] || 0) + 1;
        });

        const chartData = Object.keys(cameraCounts).map(camera => ({
          camera,
          photos: cameraCounts[camera],
        }));

        setData(chartData);
      } catch (err) {
        console.error('Failed to load Mars photos:', err);
      }
    }

    fetchMarsPhotos();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mars Photos by Camera (2025-06-03)</h2>
      <BarChart width={700} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="camera" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="photos" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
