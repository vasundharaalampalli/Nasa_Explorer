require('dotenv').config();
const axios = require('axios');

const getEpicImages = async (req, res) => {
  const { date } = req.query;
  const apiKey = process.env.NASA_API_KEY;

  if (!date) {
    return res.status(400).json({ error: 'Date is required.' });
  }

  try {
    const formattedDate = date.replace(/-/g, '/'); // Format: YYYY/MM/DD
    const metaUrl = `https://api.nasa.gov/EPIC/api/natural/date/${date}`;
    const metaResponse = await axios.get(metaUrl, {
      params: { api_key: apiKey }
    });

    const images = metaResponse.data.map((img) => ({
      caption: img.caption,
      image: `https://epic.gsfc.nasa.gov/archive/natural/${formattedDate}/png/${img.image}.png`,
      date: img.date
    }));

    res.json(images);
  } catch (error) {
    console.error('EPIC API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch EPIC images.' });
  }
};

module.exports = { getEpicImages };
