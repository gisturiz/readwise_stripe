// controllers/bookController.js
const openai = require('../utils/openaiClient');
//const { safeJsonParse, generateSearchQuery } = require('../utils/helpers');
const axios = require('axios');

async function getBookRecommendations(req, res) {
    const userMessage = req.body.message;

    try {
        // Step 1: Extract Preferences
        const prompt = `
            As an expert in literature, analyze the following user message and extract the main genres, themes, and settings. Ensure the response is in valid JSON format with keys "genres", "themes", and "settings". Only include information explicitly mentioned.

            User Message:
"${userMessage}"
`;
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: prompt },
            ],
        });

        const extractedData = completion.choices[0].message.content;

        // Step 2: Search Google Books API
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${extractedData}&maxResults=5&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

        const booksResponse = await axios.get(apiUrl);
        const books = booksResponse.data.items || [];

        if (books.length === 0) {
            return res.json({ message: 'Sorry, no books were found matching your preferences.' });
        }

        // Step 4: Format Book Data
        const formattedBooks = books.map((book) => {
            const info = book.volumeInfo;
            return {
                id: book.id,
                title: info.title,
                authors: info.authors || [],
                description: info.description || 'No description available.',
                thumbnail: info.imageLinks ? info.imageLinks.thumbnail : null,
                infoLink: info.infoLink,
            };
        });

        res.json({ books: formattedBooks });
    } catch (error) {
        console.error('Error getting book recommendations:', error.message);
        if (error.response && error.response.data) {
            console.error('Response data:', error.response.data);
        }
        res.status(500).json({ error: 'Failed to get book recommendations' });
    }
}

module.exports = {
    getBookRecommendations,
};
