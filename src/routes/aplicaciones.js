const express = require('express');
const router = express.Router();

const { createAplicacion,
    getAplicaciones,
    getTrabajosByUser,
    getAplicacionesByTrabajo,
    toggleVisibility,
} = require('../controllers/aplicacionController');


router.post("/",createAplicacion);
router.get("/",getAplicaciones);
router.get("/user/:user_id",getTrabajosByUser);
router.get("/trabajo/:trabajo_id", getAplicacionesByTrabajo);
router.patch("/:id/toggle-visibility", toggleVisibility);

module.exports = router;