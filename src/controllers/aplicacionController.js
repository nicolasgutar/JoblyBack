const asyncHandler = require('express-async-handler');
const Aplicacion = require('../models/aplicacion');
const Trabajo = require('../models/trabajo');

// @desc    Create a new application
// @route   POST /api/aplicaciones
// @access  Private
const createAplicacion = asyncHandler(async (req, res) => {
    const { user_id, trabajo_id, response } = req.body;

    const aplicacion = new Aplicacion({
        user_id,
        trabajo_id,
        response,
    });

    const trabajo = await Trabajo.findById(trabajo_id);

    if (!trabajo) {
        res.status(404);
        throw new Error('Job not found');
    }

    if (!trabajo.aplicantes.includes(user_id)) {
        trabajo.aplicantes.push(user_id);
        await trabajo.save();
    }

    const createdAplicacion = await aplicacion.save();
    res.status(201).json(createdAplicacion);
});

// @desc    Get all applications
// @route   GET /api/aplicaciones
// @access  Private
const getAplicaciones = asyncHandler(async (req, res) => {
    const aplicaciones = await Aplicacion.find().populate('user_id').populate('trabajo_id');
    res.status(200).json(aplicaciones);
});

// @desc    Get all jobs a user has applied to
// @route   GET /api/aplicaciones/user/:user_id
// @access  Private
const getTrabajosByUser = asyncHandler(async (req, res) => {
    const { user_id } = req.params;

    const aplicaciones = await Aplicacion.find({ user_id }).populate('trabajo_id');

    if (!aplicaciones) {
        res.status(404);
        throw new Error('No applications found for this user');
    }

    const trabajos = aplicaciones.map(aplicacion => aplicacion.trabajo_id);
    res.status(200).json(trabajos);
});

// @desc    Get all applications for a specific job
// @route   GET /api/aplicaciones/trabajo/:trabajo_id
// @access  Private
const getAplicacionesByTrabajo = asyncHandler(async (req, res) => {
    const { trabajo_id } = req.params;

    const aplicaciones = await Aplicacion.find({ trabajo_id }).populate('user_id');

    if (!aplicaciones) {
        res.status(404);
        throw new Error('No applications found for this job');
    }

    res.status(200).json(aplicaciones);
});

// @desc    Toggle visibility of an application
// @route   PATCH /api/aplicaciones/:id/toggle-visibility
// @access  Private
const toggleVisibility = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const aplicacion = await Aplicacion.findById(id);

    if (!aplicacion) {
        res.status(404);
        throw new Error('Application not found');
    }

    aplicacion.visibility = !aplicacion.visibility;
    await aplicacion.save();

    res.status(200).json(aplicacion);
});


module.exports = {
    createAplicacion,
    getAplicaciones,
    getTrabajosByUser,
    getAplicacionesByTrabajo,
    toggleVisibility,
};
