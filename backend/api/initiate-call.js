const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const phoneNumber = req.body.phoneNumber;
    console.log(`Initiating call to ${phoneNumber}`);

    try {
      const response = await axios.post(process.env.bland_pathway_id, {
        phoneNumber: phoneNumber,
        // Add any other data your bland.ai API needs
      }, {
        headers: {
          "Authorization": `Bearer ${process.env.bland_api_key}`,
        },
      });

      res.status(200).json({ 
        success: true, 
        message: `Call initiated to ${phoneNumber}`,
        aiResponse: response.data,
      });
    } catch (error) {
      console.error("Error calling bland.ai API:", error);
      res.status(500).json({ success: false, error: "Failed to initiate call" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};