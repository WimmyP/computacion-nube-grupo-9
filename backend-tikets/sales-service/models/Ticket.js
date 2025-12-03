const pool = require('../config/db');

const Ticket = {
  findByUserId: async (userId) => {
    const result = await pool.query('SELECT * FROM tickets WHERE user_id = $1', [userId]);
    return result.rows;
  }
};

module.exports = Ticket;

