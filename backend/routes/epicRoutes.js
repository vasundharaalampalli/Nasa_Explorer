const axios = require('axios');

const getEpicImages = async (req, res) => {
  const NASA_API_KEY = process.env.NASA_API_KEY;

  try {
    const response = await axios.get(
      `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('EPIC API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch EPIC images.' });
  }
};

module.exports = { getEpicImages };
