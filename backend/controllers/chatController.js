// controllers/chatController.js
const openai = require('../utils/openaiClient');

async function chatWithAssistant(req, res) {
  const userMessage = req.body.message;

  try {
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant specialized in book recommendations.',
        },
        { role: 'user', content: userMessage },
      ],
    });

    const assistantMessage = completion.choices[0].message.content;
    res.json({ message: assistantMessage });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error.response.data);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}

module.exports = {
  chatWithAssistant,
};
