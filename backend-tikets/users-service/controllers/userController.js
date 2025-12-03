const pool = require('../config/db');

exports.getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];
    
    if (!user) return res.status(404).send('User not found');

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

