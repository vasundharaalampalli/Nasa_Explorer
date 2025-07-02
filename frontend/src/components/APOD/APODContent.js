import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nasa-explorer-012v.onrender.com';

const APODContent = () => {
  const [apod, setApod] = useState(null);
  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);  



  const fetchAPOD = async (selectedDate) => {
    if (selectedDate > new Date()) {
      setError("Cannot fetch future APODs.");
      setApod(null);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`$${backendUrl}/api/apod`, {
        params: { date: selectedDate.toISOString().split('T')[0] },
      });
      setApod(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load data from NASA API');
      setApod(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPOD(date);
  }, [date]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated floating stars decoration */}
      <motion.div 
        className="absolute top-20 right-10 text-4xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 left-8 text-3xl"
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        🌌
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4 md:mb-0"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Astronomy Picture of the Day
          </motion.h1>
          
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              maxDate={new Date()}
              className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              popperPlacement="bottom-end"
            />
            <span className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
          </motion.div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <motion.div
            className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-600 text-red-700 dark:text-red-100 p-4 mb-6 rounded"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>{error}</p>
          </motion.div>
        ) : apod && (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              transition: { duration: 0.3 }
            }}
          >
            <div className="p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{apod.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {new Date(apod.date).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </p>
              </motion.div>
              
              <motion.div
                className="mb-6 rounded-lg overflow-hidden shadow-md relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                {apod.media_type === 'image' ? (
                  <motion.img 
                    src={apod.url} 
                    alt={apod.title} 
                    className="w-full h-auto max-h-96 object-cover"
                    loading="lazy"
                    initial={{ scale: 1 }}
                    animate={{ scale: isHovered ? 1.02 : 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <iframe
                    src={apod.url}
                    title={apod.title}
                    className="w-full aspect-video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
                {isHovered && apod.media_type === 'image' && (
                  <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-lg font-medium">Click to view full size</span>
                  </motion.div>
                )}
              </motion.div>
              
              <motion.div
                className="prose max-w-none text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="whitespace-pre-line">{apod.explanation}</p>
              </motion.div>
              
              {apod.copyright && (
                <motion.p
                  className="text-sm text-gray-500 dark:text-gray-400 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  © {apod.copyright}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default APODContent;