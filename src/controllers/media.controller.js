const Media = require('../models/media.model');

// Obtener todas las películas/series poblando relaciones
exports.obtenerTodas = async (req, res) => {
    try {
        const medias = await Media.find()
            .populate('genero', 'nombre estado')
            .populate('director', 'nombres estado')
            .populate('productora', 'nombre estado')
            .populate('tipo', 'nombre');
        res.json(medias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener registros', error: error.message });
    }
};

// Crear nueva película/serie
exports.crear = async (req, res) => {
    try {
        const { serial, url } = req.body;

        const existeSerial = await Media.findOne({ serial });
        if (existeSerial) return res.status(400).json({ mensaje: 'El serial ya existe' });

        const existeUrl = await Media.findOne({ url });
        if (existeUrl) return res.status(400).json({ mensaje: 'La URL ya existe' });

        const media = new Media(req.body);
        await media.save();
        res.status(201).json(media);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el registro', error: error.message });
    }
};

// Actualizar película/serie por ID
exports.actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        req.body.fechaActualizacion = new Date();

        const media = await Media.findByIdAndUpdate(id, req.body, { new: true });
        if (!media) return res.status(404).json({ mensaje: 'Media no encontrada' });

        res.json(media);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar', error: error.message });
    }
};

// Eliminar película/serie por ID
exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findByIdAndDelete(id);
        if (!media) return res.status(404).json({ mensaje: 'Media no encontrada' });

        res.json({ mensaje: 'Media eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};