const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importación de rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Users Service funcionando 🚀');
});

module.exports = app;

