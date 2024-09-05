const { OpenAI } = require('openai');
const { OPENAI_API_KEY } = require('./_utils/config');

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

module.exports = async (req, res) => {
  console.log('Chat API hit:', new Date().toISOString());
  
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
      });
      
      res.status(200).json({ success: true, message: completion.choices[0].message.content });
    } catch (error) {
      console.error('Chat processing error:', error);
      res.status(500).json({ success: false, error: 'Failed to process chat' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};