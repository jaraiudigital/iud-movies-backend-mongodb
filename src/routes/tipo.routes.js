const { Router } = require('express');
const router = Router();
const tipoController = require('../controllers/tipo.controller');

router.get('/', tipoController.obtenerTodos);
router.post('/', tipoController.crear);
router.put('/:id', tipoController.actualizar);
router.delete('/:id', tipoController.eliminar);

module.exports = router;