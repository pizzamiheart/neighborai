const { OpenAI } = require('openai');
const { OPENAI_API_KEY } = require('../../utils/config');

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export default async function handler(req, res) {
  console.log('Chat API hit:', new Date().toISOString());
  
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      console.log('Received message:', message);
      
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
      });
      
      const response = completion.choices[0].message.content;
      console.log('OpenAI response:', response);
      
      res.status(200).json({ success: true, message: response });
    } catch (error) {
      console.error('Chat processing error:', error);
      res.status(500).json({ success: false, error: 'Failed to process chat', details: error.message });
    }
  } else {
    console.log('Method not allowed:', req.method);
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}