const express = require('express');
const router = express.Router();

const { createAplicacion,
    getAplicaciones,
    getTrabajosByUser,
    getAplicacionesByTrabajo} = require('../controllers/aplicacionController');


router.post("/",createAplicacion);
router.get("/",getAplicaciones);
router.get("/user/:user_id",getTrabajosByUser);
router.get("/trabajo/:trabajo_id", getAplicacionesByTrabajo);

module.exports = router;