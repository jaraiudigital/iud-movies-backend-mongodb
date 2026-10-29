const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Montaje de rutas API
app.use('/api/generos', require('./routes/genero.routes'));
app.use('/api/directores', require('./routes/director.routes'));
app.use('/api/productoras', require('./routes/productora.routes'));
app.use('/api/tipos', require('./routes/tipo.routes'));
app.use('/api/medias', require('./routes/media.routes'));

// Exportar únicamente la instancia de Express
module.exports = app;