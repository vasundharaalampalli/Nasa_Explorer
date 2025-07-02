import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';

const EPIC = () => {
  const [date, setDate] = useState('2023-08-01');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEPIC = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/epic`, {
          params: { date },
        });
        setImages(res.data);
        setError('');
      } catch {
        setError('Failed to fetch EPIC images.');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEPIC();
  }, [date]);

  return (
    <motion.div
      className="max-w-7xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#4f46e5' }}>EPIC Earth Imagery</h1>

      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}
      {!loading && images.length === 0 && !error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          <p>No EPIC images found for this date.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <div className="relative aspect-video">
              <img src={img.image} alt="earth" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-1">{img.caption}</p>
              <p className="text-xs text-gray-500">
                {new Date(img.date).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EPIC;