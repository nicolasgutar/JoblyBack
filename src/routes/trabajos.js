const express = require('express');
const router = express.Router();

const { getAllTrabajos,
    getTrabajosForEmployer,
    createTrabajo,
    getTrabajoById,
    patchEstudiante,
    updateTrabajo,
    getActiveTrabajosWithApplicants } = require('../controllers/trabajoController');

router.get('/', getAllTrabajos);
router.get('/employer/:emp_id', getTrabajosForEmployer);
router.get('/reclutar', getActiveTrabajosWithApplicants);
router.get('/:id', getTrabajoById);
router.post('/', createTrabajo);
router.patch('/:id', patchEstudiante);
router.patch('/update/:id', updateTrabajo);

module.exports = router;