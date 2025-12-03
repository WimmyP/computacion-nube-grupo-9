const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const auth = require('./auth');

const app = express();

app.use(cors());
app.use(express.json());

// Proxy para el servicio de usuarios
app.use('/api/auth', proxy('http://users-service:4001/auth'));
app.use('/api/users', proxy('http://users-service:4001/users'));

// Proxy para el servicio de ventas
app.use('/api/events', proxy('http://sales-service:4002/events'));
app.use('/api/tickets', auth, proxy('http://sales-service:4002/tickets'));
app.use('/api/upload', auth, proxy('http://sales-service:4002/upload'));

app.get('/', (req, res) => {
    res.send('API Gateway funcionando 🚀');
});

module.exports = app;
