# AI Bookstore Frontend

This is the frontend application for the AI-powered bookstore.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Additional Notes](#additional-notes)
- [Future Development](#future-development)
- [Contact Information](#contact-information)

---

## Features

- **AI-Powered Chat Assistant**: Interact with an AI assistant to receive personalized book recommendations.
- **Shopping Cart**: Add books to the cart and view cart contents.
- **Checkout Process**: Proceed to checkout and process payments using Stripe.
- **Subscription Management**: Subscribe to premium features through Stripe Subscriptions.
- **Coupons and Discounts**: Apply promotion codes at checkout for discounts.

---

## Technologies Used

- **React.js**
- **Material-UI (MUI)**
- **Axios**
- **React Router DOM**
- **Stripe.js** and **React Stripe.js**

---

## Setup Instructions

### Prerequisites

- **Node.js** v14 or higher
- **npm**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ai-bookstore-frontend.git
   cd ai-bookstore-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

4. **The app should now be running at** `http://localhost:3001/`.

---

## Available Scripts

- **`npm start`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production.

---

## Configuration

- **API Base URL**: Update the API base URL in `src/services/api.js` if your backend is hosted elsewhere.

  ```javascript
  // src/services/api.js
  const API_BASE_URL = 'http://localhost:5000/api'; // Update if necessary
  ```

- **Stripe Publishable Key**: Set your Stripe publishable key in `src/App.js` when initializing Stripe.

  ```jsx
  // src/App.js
  import { loadStripe } from '@stripe/stripe-js';
  const stripePromise = loadStripe('your-publishable-key-here');
  ```

- **Environment Variables**: You can create a `.env` file in the root directory to set environment variables if needed.

---

## Project Structure

```
ai-bookstore-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Chat.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── Subscribe.js
│   │   └── ...
│   ├── context/
│   │   ├── CartContext.js
│   │   ├── SubscriptionContext.js
│   │   └── ...
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
└── README.md
```

---

## Additional Notes

- **UI Library**: The project uses **Material-UI (MUI)** for styling and UI components.
- **State Management**: Context API is used for managing cart and subscription states.
- **Routing**: React Router DOM is used for client-side routing.
- **Payment Processing**: Stripe.js and React Stripe.js are used for handling payments and subscriptions.
- **API Services**: Axios is used for making API calls to the backend.

---

## Future Development

- **User Authentication**: Implement user sign-up and login functionalities.
- **Enhanced UI/UX**: Improve the frontend design and responsiveness.
- **Mobile Compatibility**: Ensure the application is mobile-friendly.
- **Notifications**: Add toast notifications for better user feedback using libraries like `react-toastify`.
- **Error Handling**: Improve error handling and display user-friendly messages.
- **Testing**: Implement unit and integration tests using Jest and React Testing Library.

---

## Contact Information

For questions or support, please contact:

- **Your Name**
- **Email**: your.email@example.com
- **GitHub**: [yourusername](https://github.com/yourusername)

---

**Note**: Replace placeholders like `yourusername` and `your.email@example.com` with your actual information.