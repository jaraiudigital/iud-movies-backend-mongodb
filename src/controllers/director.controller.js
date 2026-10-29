const Director = require('../models/director.model');

// Obtener todos los directores
exports.obtenerTodos = async (req, res) => {
    try {
        const directores = await Director.find().sort({ fechaCreacion: -1 });
        res.json(directores);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los directores', error: error.message });
    }
};

// Crear un director
exports.crear = async (req, res) => {
    try {
        const director = new Director(req.body);
        await director.save();
        res.status(201).json(director);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el director', error: error.message });
    }
};

// Actualizar director por ID
exports.actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        req.body.fechaActualizacion = new Date();

        const director = await Director.findByIdAndUpdate(id, req.body, { new: true });
        if (!director) return res.status(404).json({ mensaje: 'Director no encontrado' });

        res.json(director);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el director', error: error.message });
    }
};

// Eliminar director por ID
exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        const director = await Director.findByIdAndDelete(id);
        if (!director) return res.status(404).json({ mensaje: 'Director no encontrado' });

        res.json({ mensaje: 'Director eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el director', error: error.message });
    }
};