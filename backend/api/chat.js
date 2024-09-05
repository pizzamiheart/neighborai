const { OpenAI } = require('openai');
const { OPENAI_API_KEY } = require('./_utils/config');

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

module.exports = async (req, res) => {
  console.log('Chat API hit:', new Date().toISOString());
  
  if (req.method === 'POST') {
    res.status(200).json({ success: true, message: "This is a test response from the server." });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};