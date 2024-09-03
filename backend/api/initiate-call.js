const { corsOptions, axios } = require('../backend/server');
const cors = require('cors')(corsOptions);

module.exports = (req, res) => {
  return cors(req, res, async () => {
    if (req.method === 'POST') {
      if (!process.env.BLAND_API_KEY) {
        return res.status(500).json({ success: false, error: 'BlandAI configuration is missing' });
      }

      console.log('Attempting to initiate call via BlandAI API...');
      console.log('BlandAI API Key being used (first 10 chars):', process.env.BLAND_API_KEY.substring(0, 10) + '...');

      const headers = {
        'Authorization': `Bearer ${process.env.BLAND_API_KEY}`,
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
        "pathway_id": process.env.BLAND_PATHWAY_ID,
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
      res.status(405).json({ error: 'Method not allowed' });
    }
  });
};