// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { chatWithAssistant } = require('../controllers/chatController');

// POST /api/chat/
router.post('/', chatWithAssistant);

module.exports = router;
