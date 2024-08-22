const express = require('express');
const router = express.Router();

const { getEmpresas, createEmpresa, getEmpresaById } = require('../controllers/empresaController');

router.get('/empresas', getEmpresas);
router.post('/empresas', createEmpresa);
router.get('/empresas/:id', getEmpresaById);

module.exports = router;