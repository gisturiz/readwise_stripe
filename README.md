# AI Bookstore Project

Welcome to the AI Bookstore project! This is a full-stack application that leverages AI to provide personalized book recommendations and an e-commerce platform for purchasing books. The project consists of a frontend built with React and a backend powered by Node.js and Express.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Installation](#backend-installation)
  - [Frontend Installation](#frontend-installation)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Additional Notes](#additional-notes)
- [Future Development](#future-development)

---

## Features

- **AI-Powered Chat Assistant**: Users can interact with an AI assistant to receive personalized book recommendations.
- **Book Recommendations**: Fetches book data from the Google Books API based on user preferences.
- **Shopping Cart**: Add books to a cart and view cart contents.
- **Checkout Process**: Process payments using Stripe's payment gateway.
- **Coupons and Discounts**: Users can apply promotion codes at checkout for discounts.

---

## Technologies Used

### Frontend

- **React.js**
- **Material-UI (MUI)**
- **Axios**
- **React Router DOM**
- **Stripe.js** and **React Stripe.js**

### Backend

- **Node.js**
- **Express.js**
- **OpenAI API**
- **Google Books API**
- **Stripe API**

---

## Setup Instructions

### Prerequisites

- **Node.js** v14 or higher
- **npm**
- **OpenAI API Key**
- **Stripe API Keys**

### Backend Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ai-bookstore.git
   cd ai-bookstore/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   ```bash
   touch .env
   ```

4. **Add your API keys and configuration to the `.env` file:**

   ```ini
   OPENAI_API_KEY=your-openai-api-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   PORT=3000
   ```

5. **Start the server:**

   ```bash
   node server.js
   ```

6. **The backend server should now be running at** `http://localhost:5000/`.

### Frontend Installation

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file (optional for environment variables):**

   ```bash
   touch .env
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

5. **The app should now be running at** `http://localhost:3001/`.

---

## Project Structure

```
ai-bookstore/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── README.md
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── services/
    │   ├── App.js
    │   ├── index.js
    │   └── ...
    ├── public/
    ├── .env
    ├── package.json
    └── README.md
```

---

## Available Scripts

### Backend

- **`node server.js`**: Starts the backend server.
- **`npm start`**: If configured with `nodemon`, starts the server with automatic restarts on file changes.

### Frontend

- **`npm start`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production.

---

## Configuration

### Backend

- **OpenAI API Key**: Set your OpenAI API key in the `.env` file.
- **Stripe Secret Key**: Set your Stripe secret key in the `.env` file.
- **Port**: Update the `PORT` in the `.env` file if you wish to run the server on a different port.

### Frontend

- **API Base URL**: Update the API base URL in `src/services/api.js` if your backend is hosted elsewhere.
- **Stripe Publishable Key**: Set your Stripe publishable key in `src/App.js` when initializing Stripe.

  ```jsx
  const stripePromise = loadStripe('your-publishable-key-here');
  ```

---

## API Endpoints

### Backend Endpoints

#### Chat with Assistant

- **Endpoint:** `POST /api/chat/`

- **Request Body:**

  ```json
  {
    "message": "Your message here"
  }
  ```

- **Description:**

  This endpoint allows you to interact with the AI assistant for book recommendations.

- **Example Request:**

  ```bash
  curl -X POST http://localhost:3000/api/chat/ \
    -H "Content-Type: application/json" \
    -d '{"message": "Can you suggest a good mystery novel?"}'
  ```

#### Get Book Recommendations

- **Endpoint:** `POST /api/books/recommendations`

- **Request Body:**

  ```json
  {
    "message": "I enjoy fantasy novels with dragons."
  }
  ```

- **Description:**

  Returns a list of book recommendations based on user preferences.

- **Example Request:**

  ```bash
  curl -X POST http://localhost:3000/api/books/recommendations \
    -H "Content-Type: application/json" \
    -d '{"message": "I love science fiction books about space exploration."}'
  ```

#### Create Payment Intent

- **Endpoint:** `POST /api/payment/create-payment-intent`

- **Request Body:**

  ```json
  {
    "items": [/* Array of cart items */],
    "promotionCode": "OPTIONAL_PROMO_CODE"
  }
  ```

- **Description:**

  Creates a Stripe Payment Intent for processing payments.

#### Create Subscription

- **Endpoint:** `POST /api/payment/create-subscription`

- **Request Body:**

  ```json
  {
    "paymentMethodId": "pm_XXXXXXXXXXXXXXXX",
    "email": "user@example.com",
    "priceId": "price_XXXXXXXXXXXXXXXX"
  }
  ```

- **Description:**

  Creates a Stripe subscription for the user.

---

## Testing

Use tools like **Postman**, **Insomnia**, or **cURL** to test the backend endpoints.

- **Example with cURL:**

  ```bash
  curl -X POST http://localhost:3000/api/chat/ \
    -H "Content-Type: application/json" \
    -d '{"message": "Recommend me a historical fiction book."}'
  ```

---

## Additional Notes

- **Security**:

  - Ensure that your API keys are kept secure and not exposed in any client-side code or committed to version control.
  - Use environment variables or a secure key management system for storing sensitive information.

- **Error Handling**:

  - The application includes basic error handling. For production use, consider enhancing error handling and logging.

- **Rate Limits**:

  - Be mindful of API rate limits for OpenAI, Google Books API, and Stripe to avoid service disruptions.

- **Deployment**:

  - For deploying the application, consider services like **Heroku** for the backend and **Netlify** or **Vercel** for the frontend.
  - Ensure environment variables are set appropriately in the hosting environment.

---

## Future Development

- **User Authentication**: Implement user sign-up and login functionalities.
- **Database Integration**: Add persistent storage using databases like MongoDB or PostgreSQL.
- **Enhanced Subscription Management**: Allow users to manage subscriptions within the app.
- **Additional Payment Methods**: Integrate more payment options (e.g., PayPal, Apple Pay).
- **Improved UI/UX**: Enhance the frontend with better design and responsiveness.
- **Mobile Compatibility**: Ensure the application is mobile-friendly.
- **Analytics and Monitoring**: Implement analytics to track user interactions and monitor system performance.