const { Router } = require('express');
const router = Router();
const directorController = require('../controllers/director.controller');

router.get('/', directorController.obtenerTodos);
router.post('/', directorController.crear);
router.put('/:id', directorController.actualizar);
router.delete('/:id', directorController.eliminar);

module.exports = router;