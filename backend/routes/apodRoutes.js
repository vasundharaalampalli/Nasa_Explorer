const axios = require('axios');

const getAPOD = async (req, res) => {
  const date = req.query.date || new Date().toISOString().split('T')[0];
  const NASA_API_KEY = process.env.NASA_API_KEY;

  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('APOD API error:', error.response?.data || error.message);

    if (error.response?.status === 400) {
      res.status(400).json({
        error: 'APOD not available for that date. Please select an earlier date.',
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch APOD data from NASA.' });
    }
  }
};

module.exports = { getAPOD };
