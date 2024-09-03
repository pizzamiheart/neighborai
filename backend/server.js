const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

dotenv.config();

const corsOptions = {
  origin: 'https://loquacious-stroopwafel-80e0ed.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Export shared utilities and configurations
module.exports = {
  axios,
  cors: cors(corsOptions),
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  BLAND_API_KEY: process.env.BLAND_API_KEY,
  BLAND_PATHWAY_ID: process.env.BLAND_PATHWAY_ID
};

// Log environment variable status
console.log('OpenAI API Key loaded:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');
console.log('BlandAI API Key loaded:', process.env.BLAND_API_KEY ? 'Yes' : 'No');
console.log('BlandAI Pathway ID:', process.env.BLAND_PATHWAY_ID || 'Not available');

app.use(cors(corsOptions));