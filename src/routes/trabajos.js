const express = require('express');
const router = express.Router();

const { getAllTrabajos, getTrabajosForEmployer, createTrabajo, getTrabajoById, patchEstudiante } = require('../controllers/trabajoController');

router.get('/', getAllTrabajos);
router.get('/employer/:emp_id', getTrabajosForEmployer);
router.get('/:id', getTrabajoById);
router.post('/', createTrabajo);
router.patch('/:id', patchEstudiante); // New route

module.exports = router;