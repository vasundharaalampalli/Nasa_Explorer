require('dotenv').config();
const axios = require('axios');

const getMarsPhotos = async (req, res) => {
  const { rover, date } = req.query;
  const apiKey = process.env.NASA_API_KEY;

  if (!rover || !date) {
    return res.status(400).json({ error: 'Rover and date are required.' });
  }

  try {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;
    const response = await axios.get(url, {
      params: {
        earth_date: date,
        api_key: apiKey
      }
    });

    res.json(response.data.photos);
  } catch (error) {
    console.error('Mars API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch Mars rover photos.' });
  }
};

module.exports = { getMarsPhotos };
