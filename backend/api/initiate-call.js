const { axios, BLAND_API_KEY, BLAND_PATHWAY_ID } = require('../_utils/config');

console.log('API endpoint hit:', new Date().toISOString());

const handler = async (req, res) => {
  if (req.method === 'POST') {
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
      "task": req.body.task || "Assist with tech issues",
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
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

module.exports = handler;