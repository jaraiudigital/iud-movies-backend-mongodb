const { Router } = require('express');
const router = Router();
const generoController = require('../controllers/genero.controller');

router.get('/', generoController.obtenerTodos);
router.post('/', generoController.crear);
router.put('/:id', generoController.actualizar);
router.delete('/:id', generoController.eliminar);

module.exports = router;