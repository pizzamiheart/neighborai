const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

module.exports = {
  axios,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  BLAND_API_KEY: process.env.BLAND_API_KEY,
  BLAND_PATHWAY_ID: process.env.BLAND_PATHWAY_ID
};

// Log environment variable status
console.log('Config file loaded');
console.log('OpenAI API Key loaded:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');
console.log('BlandAI API Key loaded:', process.env.BLAND_API_KEY ? 'Yes' : 'No');
console.log('BlandAI Pathway ID:', process.env.BLAND_PATHWAY_ID || 'Not available');