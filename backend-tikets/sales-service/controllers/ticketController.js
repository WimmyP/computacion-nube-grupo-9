const pool = require('../config/db');
const { getChannel } = require('../config/rabbitmq');

exports.createTicket = async (req, res) => {
  const { eventId, userId, price, quantity } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tickets (event_id, user_id, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [eventId, userId, price, quantity]
    );

    const ticket = result.rows[0];

    // Publish message to RabbitMQ
    const channel = getChannel();
    if (channel) {
      const queue = 'ticket_sales';
      const msg = JSON.stringify(ticket);

      await channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    }

    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getTicketsByUser = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query('SELECT * FROM tickets WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

