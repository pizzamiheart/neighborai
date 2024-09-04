const { axios, OPENAI_API_KEY, BLAND_API_KEY, BLAND_PATHWAY_ID } = require('./_utils/config');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Your existing chat logic here
    // For example:
    try {
      // Process the chat
      // ...
      res.status(200).json({ success: true, message: 'Chat processed successfully' });
    } catch (error) {
      console.error('Chat processing error:', error);
      res.status(500).json({ success: false, error: 'Failed to process chat' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

module.exports = handler;