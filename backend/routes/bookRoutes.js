// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { getBookRecommendations } = require('../controllers/bookController');

// POST /api/books/recommendations
router.post('/recommendations', getBookRecommendations);

module.exports = router;
