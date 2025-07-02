import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nasa-explorer-012v.onrender.com';

const MarsContent = () => {
  const [date, setDate] = useState(new Date('2022-12-01'));
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchPhotos = async (selectedDate) => {
    setLoading(true);
    setError('');
    setPhotos([]);

    const formattedDate = selectedDate.toISOString().split('T')[0];
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/mars?rover=curiosity&date=${formattedDate}`
      );
      if (res.data.photos && res.data.photos.length > 0) {
        setPhotos(res.data.photos);
      } else {
        setError('No photos found for this date.');
      }
    } catch (err) {
      setError('Failed to fetch Mars Rover photos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(date);
  }, [date]);

  return (
    <div className="text-white text-center px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">📸 Mars Rover Photos</h2>
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        maxDate={new Date()}
        className="text-black px-2 py-1 rounded mb-4"
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-gray-800 rounded shadow p-2">
              <img src={photo.img_src} alt="Mars" className="w-full h-60 object-cover rounded" />
              <p className="mt-2 text-sm">Rover: {photo.rover.name}</p>
              <p className="text-sm">Camera: {photo.camera.full_name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarsContent;
