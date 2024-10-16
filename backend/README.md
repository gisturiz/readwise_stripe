AI Bookstore Backend
This is the backend service for the AI-powered bookstore. It integrates OpenAI's GPT-3.5/4 to extract user preferences and the Google Books API to fetch book recommendations.

Setup Instructions
Prerequisites
Node.js v14 or higher
npm
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/ai-bookstore-backend.git
cd ai-bookstore-backend
Install dependencies:

bash
Copy code
npm install
Create a .env file:

bash
Copy code
touch .env
Add your OpenAI API key and desired port to the .env file:

dotenv
Copy code
OPENAI_API_KEY=your-openai-api-key
PORT=5000
Start the server:

bash
Copy code
node server.js
The server should now be running at http://localhost:5000/.

API Endpoints
Chat with Assistant
Endpoint:

bash
Copy code
POST /api/chat/
Request Body:

json
Copy code
{
  "message": "Your message here"
}
Description:

This endpoint allows you to interact with the AI assistant specialized in book recommendations. Send a message, and the assistant will respond accordingly.

Example Request:

bash
Copy code
curl -X POST http://localhost:5000/api/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Can you suggest a good mystery novel?"}'
Get Book Recommendations
Endpoint:

bash
Copy code
POST /api/books/recommendations
Request Body:

json
Copy code
{
  "message": "I enjoy fantasy novels with dragons."
}
Description:

This endpoint takes a user's message expressing their book preferences and returns a list of book recommendations by extracting key themes and querying the Google Books API.

Example Request:

bash
Copy code
curl -X POST http://localhost:5000/api/books/recommendations \
  -H "Content-Type: application/json" \
  -d '{"message": "I love science fiction books about space exploration."}'
Example Response:

json
Copy code
{
  "books": [
    {
      "id": "book-id-1",
      "title": "Dune",
      "authors": ["Frank Herbert"],
      "description": "Set on the desert planet Arrakis...",
      "thumbnail": "http://books.google.com/...",
      "infoLink": "http://books.google.com/..."
    },
    {
      "id": "book-id-2",
      "title": "Ender's Game",
      "authors": ["Orson Scott Card"],
      "description": "A young genius is recruited...",
      "thumbnail": "http://books.google.com/...",
      "infoLink": "http://books.google.com/..."
    }
    // More books...
  ]
}
Testing
Use tools like Postman, Insomnia, or cURL to test the endpoints.

Example with cURL:

bash
Copy code
curl -X POST http://localhost:5000/api/chat/ \
  -H "Content-Type: application/json" \
  -d '{"message": "Recommend me a historical fiction book."}'
Project Structure
bash
Copy code
ai-bookstore-backend/
├── controllers/
│   ├── bookController.js
│   └── chatController.js
├── routes/
│   ├── bookRoutes.js
│   └── chatRoutes.js
├── utils/
│   ├── helpers.js
│   └── openaiClient.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
Dependencies
express: Fast, unopinionated, minimalist web framework for Node.js
dotenv: Loads environment variables from a .env file into process.env
openai: Official OpenAI API client library
axios: Promise-based HTTP client for the browser and Node.js
cors: Express middleware to enable CORS with various options
express-validator (optional): Set of express.js middlewares that wraps validator.js validator and sanitizer functions
morgan (optional): HTTP request logger middleware for Node.js
Additional Notes
Security: Ensure that your OPENAI_API_KEY is kept secure and not exposed in any client-side code or committed to version control.
Error Handling: The application includes basic error handling. For production use, consider enhancing error handling and logging.
Rate Limits: Be mindful of API rate limits for both OpenAI and Google Books APIs to avoid service disruptions.
Further Development: This backend can be extended with additional features such as user authentication, database integration for persistent storage, and more robust logging and monitoring.
