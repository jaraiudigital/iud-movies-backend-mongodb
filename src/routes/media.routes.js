const { Router } = require('express');
const router = Router();
const mediaController = require('../controllers/media.controller');

router.get('/', mediaController.obtenerTodas);
router.post('/', mediaController.crear);
router.put('/:id', mediaController.actualizar);
router.delete('/:id', mediaController.eliminar);

module.exports = router;