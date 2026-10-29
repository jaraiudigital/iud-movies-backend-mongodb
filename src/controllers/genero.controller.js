const Genero = require('../models/genero.model');

// Obtener todos los géneros
exports.obtenerTodos = async (req, res) => {
    try {
        const generos = await Genero.find().sort({ fechaCreacion: -1 });
        res.json(generos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los géneros', error: error.message });
    }
};

// Crear un género
exports.crear = async (req, res) => {
    try {
        const { nombre } = req.body;

        const existeNombre = await Genero.findOne({ nombre });
        if (existeNombre) return res.status(400).json({ mensaje: 'El género ya existe' });

        const genero = new Genero(req.body);
        await genero.save();
        res.status(201).json(genero);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el género', error: error.message });
    }
};

// Actualizar género por ID
exports.actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        req.body.fechaActualizacion = new Date();

        const genero = await Genero.findByIdAndUpdate(id, req.body, { new: true });
        if (!genero) return res.status(404).json({ mensaje: 'Género no encontrado' });

        res.json(genero);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el género', error: error.message });
    }
};

// Eliminar género por ID
exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByIdAndDelete(id);
        if (!genero) return res.status(404).json({ mensaje: 'Género no encontrado' });

        res.json({ mensaje: 'Género eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el género', error: error.message });
    }
};