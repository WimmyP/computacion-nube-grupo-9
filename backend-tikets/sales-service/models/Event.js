const pool = require('../config/db');

const Event = {
  findAll: async () => {
    const result = await pool.query('SELECT * FROM events');
    return result.rows;
  }
};

module.exports = Event;

