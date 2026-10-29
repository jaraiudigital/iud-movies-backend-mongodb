require('dotenv').config();
const app = require('./src/app');
const { getConnection } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    // 1. Conexión asíncrona a MongoDB Atlas
    await getConnection();

    // 2. Iniciar el servidor Express
    app.listen(PORT, () => {
        console.log(`🚀 Servidor Backend ejecutándose en http://localhost:${PORT}`);
    });
};

startServer();