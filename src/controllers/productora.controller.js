const Productora = require('../models/productora.model');

// Obtener todas las productoras
exports.obtenerTodas = async (req, res) => {
    try {
        const productoras = await Productora.find().sort({ fechaCreacion: -1 });
        res.json(productoras);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las productoras', error: error.message });
    }
};

// Crear una productora
exports.crear = async (req, res) => {
    try {
        const { nombre } = req.body;

        const existeNombre = await Productora.findOne({ nombre });
        if (existeNombre) return res.status(400).json({ mensaje: 'La productora ya existe' });

        const productora = new Productora(req.body);
        await productora.save();
        res.status(201).json(productora);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la productora', error: error.message });
    }
};

// Actualizar productora por ID
exports.actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        req.body.fechaActualizacion = new Date();

        const productora = await Productora.findByIdAndUpdate(id, req.body, { new: true });
        if (!productora) return res.status(404).json({ mensaje: 'Productora no encontrada' });

        res.json(productora);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la productora', error: error.message });
    }
};

// Eliminar productora por ID
exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        const productora = await Productora.findByIdAndDelete(id);
        if (!productora) return res.status(404).json({ mensaje: 'Productora no encontrada' });

        res.json({ mensaje: 'Productora eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la productora', error: error.message });
    }
};