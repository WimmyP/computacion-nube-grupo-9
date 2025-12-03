const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'users-service',
  brokers: process.env.KAFKA_BROKERS.split(','),
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer connected');
};

module.exports = { producer, connectProducer };
