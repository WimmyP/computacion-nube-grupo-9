const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

let channel = null;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (err) {
    console.error('Failed to connect to RabbitMQ', err);
  }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };
