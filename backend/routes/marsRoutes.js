const axios = require('axios');

const getMarsPhotos = async (req, res) => {
  const date = req.query.date || '2022-12-01';
  const NASA_API_KEY = process.env.NASA_API_KEY;

  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Mars API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Mars Rover photos.' });
  }
};

module.exports = { getMarsPhotos };
