const express = require('express');
const router = express.Router();

const { createAplicacion, getAplicaciones, getTrabajosByUser } = require('../controllers/aplicacionController');


router.post("/",createAplicacion);
router.get("/",getAplicaciones);
router.get("/user/:user_id",getTrabajosByUser);

module.exports = router;