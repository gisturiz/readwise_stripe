// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3001', // Update this with your frontend URL
  }));
app.use(express.json());

// Routes
const chatRoutes = require('./routes/chatRoutes');
const bookRoutes = require('./routes/bookRoutes');
const paymentRoutes = require('./routes/paymentsRoutes');

app.use('/api/chat', chatRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/payment', paymentRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('AI Bookstore Backend is running.');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
