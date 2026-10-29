const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.error('❌ Error de conexión a MongoDB Atlas:', error.message);
        process.exit(1);
    }
};

module.exports = { getConnection };