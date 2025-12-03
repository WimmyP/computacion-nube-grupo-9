const app = require('./app');
const dotenv = require('dotenv');
const pool = require('./config/db');
const { connectRabbitMQ } = require('./config/rabbitmq');
const { runConsumer } = require('./kafka-consumer');

dotenv.config();

const PORT = process.env.PORT || 4002;

// Verifica la conexión a PostgreSQL y RabbitMQ antes de arrancar el servidor
pool.connect()
  .then(async () => {
    console.log('Conectado a PostgreSQL');

    await connectRabbitMQ();
    await runConsumer(); // Start Kafka consumer

    app.listen(PORT, () => {
      console.log(`Servidor de Ventas corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error conectando a PostgreSQL:', err);
  });
