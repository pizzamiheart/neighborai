const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BLAND_API_KEY = process.env.BLAND_API_KEY;
const BLAND_PATHWAY_ID = process.env.BLAND_PATHWAY_ID;

console.log('OpenAI API Key loaded:', OPENAI_API_KEY ? 'Yes' : 'No');
console.log('OpenAI API Key (first 5 chars):', OPENAI_API_KEY ? OPENAI_API_KEY.substring(0, 5) + '...' : 'Not available');
console.log('BlandAI API Key loaded:', BLAND_API_KEY ? 'Yes' : 'No');
console.log('BlandAI API Key (first 5 chars):', BLAND_API_KEY ? BLAND_API_KEY.substring(0, 5) + '...' : 'Not available');
console.log('BlandAI Pathway ID:', BLAND_PATHWAY_ID || 'Not available');

// OpenAI chat endpoint
app.post('/api/chat', async (req, res) => {
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
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('OpenAI API response:', response.data);

    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// BlandAI call initiation endpoint
app.post('/api/initiate-call', async (req, res) => {
  if (!BLAND_API_KEY) {
    return res.status(500).json({ success: false, error: 'BlandAI configuration is missing' });
  }

  console.log('Attempting to initiate call via BlandAI API...');
  console.log('BlandAI API Key being used (first 10 chars):', BLAND_API_KEY.substring(0, 10) + '...');

  const headers = {
    'Authorization': `Bearer ${BLAND_API_KEY}`,
    'Content-Type': 'application/json'
  };

  const data = {
    "phone_number": req.body.phoneNumber,
    "from": null,
    "task": req.body.task || "",
    "model": "enhanced",
    "language": "en",
    "voice": "nat",
    "voice_settings": {},
    "pathway_id": BLAND_PATHWAY_ID,
    "local_dialing": false,
    "max_duration": 12,
    "answered_by_enabled": false,
    "wait_for_greeting": false,
    "record": false,
    "amd": false,
    "interruption_threshold": 100,
    "voicemail_message": null,
    "temperature": null,
    "transfer_phone_number": null,
    "transfer_list": {},
    "metadata": {},
    "pronunciation_guide": [],
    "start_time": null,
    "request_data": {},
    "dynamic_data": [],
    "analysis_preset": null,
    "analysis_schema": {},
    "webhook": null,
  };

  console.log('Full request payload:', JSON.stringify(data, null, 2));

  try {
    const response = await axios.post('https://us.api.bland.ai/v1/calls', data, { headers });

    console.log('BlandAI API response:', response.data);

    if (response.data.status === 'success') {
      res.json({ success: true, message: 'Call initiated successfully', callId: response.data.call_id });
    } else {
      res.status(400).json({ success: false, error: 'Error initiating call', details: response.data.message });
    }
  } catch (error) {
    console.error('BlandAI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, error: 'Failed to initiate call', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));