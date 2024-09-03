const { axios, cors, OPENAI_API_KEY } = require('../backend/server');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    try {
      const userMessage = req.body.message;
      
      console.log('Received message:', userMessage);

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system", 
            content: "You are Neighbor, a friendly and empathetic tech support assistant. Provide helpful, affirming, and extremely clear explanations for tech-related questions. Use simple language and break down complex tasks into easy-to-follow steps. Always be patient and encouraging."
          },
          {
            role: "user", 
            content: userMessage
          }
        ],
        max_tokens: 300
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('OpenAI API response:', response.data);

      res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
      console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end('Method Not Allowed');
  }
};