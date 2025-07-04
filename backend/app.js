// app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const apodRoutes = require('./routes/apodRoutes');
const marsRoutes = require('./routes/marsRoutes');
const epicRoutes = require('./routes/epicRoutes');

const app = express();

// Middleware
app.use(express.json());

//  Update allowed origins to include current deployed frontend
const allowedOrigins = [
  'http://localhost:3000',
  'https://nasa-explorer-012v.onrender.com',
  'https://nasa-explorer-l6uobwo4s-vasundharas-projects-0cb045e4.vercel.app' // ✅ <-- Replace with your current frontend
];

//  CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin: ' + origin));
    }
  },
  credentials: true,
}));

// API Routes
app.use('/api/apod', apodRoutes);
app.use('/api/mars', marsRoutes);
app.use('/api/epic', epicRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('NASA Explorer backend is running.');
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
