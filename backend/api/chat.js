const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const userMessage = req.body.message;

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: userMessage }
        ],
      });

      res.status(200).json({
        success: true,
        message: completion.data.choices[0].message.content,
      });
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      res.status(500).json({
        success: false,
        error: "Failed to get AI response"
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};