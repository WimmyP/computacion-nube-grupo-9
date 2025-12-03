const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;

