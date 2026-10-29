const { Router } = require('express');
const router = Router();
const productoraController = require('../controllers/productora.controller');

router.get('/', productoraController.obtenerTodas);
router.post('/', productoraController.crear);
router.put('/:id', productoraController.actualizar);
router.delete('/:id', productoraController.eliminar);

module.exports = router;