const app = require('./app');
const dotenv = require('dotenv');
const pool = require('./config/db');
const { connectProducer } = require('./config/kafka');

dotenv.config();

const PORT = process.env.PORT || 4001;

// Verifica la conexión a PostgreSQL antes de arrancar el servidor
pool.connect()
  .then(async () => {
    console.log('Conectado a PostgreSQL');
    await connectProducer();

    app.listen(PORT, () => {
      console.log(`Servidor de Usuarios corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error conectando a PostgreSQL:', err);
  });

