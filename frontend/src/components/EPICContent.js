import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://nasa-explorer-012v.onrender.com';

const EPICContent = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const fetchEPIC = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/epic`);
      setImages(res.data.slice(0, 6)); 
    } catch (err) {
      setError('Failed to fetch EPIC images.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEPIC();
  }, []);

  return (
    <div className="text-white text-center px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">Earth from Space (EPIC)</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {images.map((img) => {
            const dateParts = img.date.split(' ')[0].split('-'); // yyyy-mm-dd
            const url = `https://epic.gsfc.nasa.gov/archive/natural/${dateParts[0]}/${dateParts[1]}/${dateParts[2]}/jpg/${img.image}.jpg`;
            return (
              <div key={img.identifier} className="bg-gray-800 rounded shadow p-2">
                <img src={url} alt="Earth" className="w-full h-60 object-cover rounded" />
                <p className="mt-2 text-sm">Date: {img.date}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EPICContent;
