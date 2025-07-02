require('dotenv').config();
const axios = require('axios');

const getAPOD = async (req, res) => {
  const date = req.query.date || new Date().toISOString().split('T')[0];
  
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${date}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
};

module.exports = { getAPOD };