const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: { type: String, required: [true, 'El serial es obligatorio'], unique: true },
    titulo: { type: String, required: [true, 'El título es obligatorio'] },
    sinopsis: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    imagenPortada: { type: String, required: true },
    anoEstreno: { type: Number, required: true },
    genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true },
    director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    productora: { type: Schema.Types.ObjectId, ref: 'Productora', required: true },
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = model('Media', MediaSchema);