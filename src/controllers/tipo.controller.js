const Tipo = require('../models/tipo.model');

// Obtener todos los tipos
exports.obtenerTodos = async (req, res) => {
    try {
        const tipos = await Tipo.find().sort({ fechaCreacion: -1 });
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los tipos', error: error.message });
    }
};

// Crear un tipo
exports.crear = async (req, res) => {
    try {
        const { nombre } = req.body;

        const existeNombre = await Tipo.findOne({ nombre });
        if (existeNombre) return res.status(400).json({ mensaje: 'El tipo ya existe' });

        const tipo = new Tipo(req.body);
        await tipo.save();
        res.status(201).json(tipo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el tipo', error: error.message });
    }
};

// Actualizar tipo por ID
exports.actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        req.body.fechaActualizacion = new Date();

        const tipo = await Tipo.findByIdAndUpdate(id, req.body, { new: true });
        if (!tipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' });

        res.json(tipo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el tipo', error: error.message });
    }
};

// Eliminar tipo por ID
exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await Tipo.findByIdAndDelete(id);
        if (!tipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' });

        res.json({ mensaje: 'Tipo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el tipo', error: error.message });
    }
};