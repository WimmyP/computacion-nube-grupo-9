const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importación de rutas
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/events', eventRoutes);
app.use('/tickets', ticketRoutes);
app.use('/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('Sales Service funcionando 🚀');
});

module.exports = app;
