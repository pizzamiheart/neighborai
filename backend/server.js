const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

dotenv.config();

// Keep CORS configuration for use in serverless functions
const corsOptions = {
  origin: 'https://loquacious-stroopwafel-80e0ed.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Export CORS options and any other shared configurations or utilities
module.exports = {
  corsOptions,
  axios,
  // Add any other shared utilities or configurations here
};