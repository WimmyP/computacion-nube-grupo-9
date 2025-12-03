const express = require('express');
const { createTicket, getTicketsByUser } = require('../controllers/ticketController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createTicket);
router.get('/my-tickets', authMiddleware, getTicketsByUser);

module.exports = router;

