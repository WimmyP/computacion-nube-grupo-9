const { consumer } = require('./config/kafka');

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value.toString());
      console.log({
        topic,
        partition,
        offset: message.offset,
        value,
      });

      // Example: Handle different event types
      switch (value.type) {
        case 'USER_CREATED':
          console.log(`Sales Service: New User Created - ID: ${value.data.id}, Name: ${value.data.name}`);
          // Here you could process the new user data, e.g., store it locally if needed
          break;
        default:
          console.log(`Sales Service: Unhandled event type: ${value.type}`);
      }
    },
  });

  console.log('Kafka Consumer started for user-events');
};

module.exports = { runConsumer };
