const pool = require('../config/db');
const redisClient = require('../config/redis');

exports.createEvent = async (req, res) => {
  const { title, date, location, price, status } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO events (title, date, location, price, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, date, location, price, status]
    );

    const event = result.rows[0];

    // Invalidate cache after creating a new event
    await redisClient.del('events');

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const cachedEvents = await redisClient.get('events');

    if (cachedEvents) {
      return res.json(JSON.parse(cachedEvents));
    }

    const result = await pool.query('SELECT * FROM events');
    const events = result.rows;

    await redisClient.setEx('events', 3600, JSON.stringify(events));

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

