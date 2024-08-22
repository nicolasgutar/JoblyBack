const asyncHandler = require('express-async-handler');
const Empresa = require('../models/empresa');
const mongoose = require("mongoose");

// @desc    Get all companies
// @route   GET /api/empresas
// @access  Public
const getEmpresas = asyncHandler(async (req, res) => {
    const empresas = await Empresa.find();
    res.status(200).json(empresas);
});

// @desc    Create a new company
// @route   POST /api/empresas
// @access  Public
const createEmpresa = asyncHandler(async (req, res) => {
    const { nombre, contacto, descripcion } = req.body;

    if (!nombre || !contacto || !descripcion) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const empresa = new Empresa({
        nombre,
        contacto,
        descripcion,
        tot_trabajos:0,
    });

    const createdEmpresa = await empresa.save();
    res.status(201).json(createdEmpresa);
});

// @desc    Get company by ID
// @route   GET /api/empresas/:id
// @access  Public
const getEmpresaById = asyncHandler(async (req, res) => {

    const empresa = await Empresa.findById(req.params.id);

    if (!empresa) {
        res.status(404);
        throw new Error('Company not found');
    }

    res.status(200).json(empresa);
});

module.exports = {
    getEmpresas,
    createEmpresa,
    getEmpresaById,
};