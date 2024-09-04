const { axios, OPENAI_API_KEY } = require('./_utils/config');
const OpenAI = require('openai');

const openai = new OpenAI(OPENAI_API_KEY);

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
      });
      
      const response = completion.choices[0].message.content;
      
      res.status(200).json({ success: true, message: response });
    } catch (error) {
      console.error('Chat processing error:', error);
      res.status(500).json({ success: false, error: 'Failed to process chat' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

module.exports = handler;