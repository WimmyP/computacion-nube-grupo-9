const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'sales-service',
  brokers: process.env.KAFKA_BROKERS.split(','),
});

const consumer = kafka.consumer({ groupId: 'sales-group' });

module.exports = { consumer };
