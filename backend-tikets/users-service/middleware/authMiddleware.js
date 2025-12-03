const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) return res.status(401).send('Authentication token is required');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);

    if (!user.rows.length) return res.status(401).send('User not found');
    
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send('Unauthorized');
  }
};

module.exports = authMiddleware;

