const asyncHandler = require('express-async-handler');
const Trabajo = require('../models/trabajo');
const mongoose = require("mongoose");

// @desc    Get all jobs
// @route   GET /api/trabajos
// @access  Public
const getAllTrabajos = asyncHandler(async (req, res) => {
    const trabajos = await Trabajo.find();
    res.status(200).json(trabajos);
});

// @desc    Get jobs for a specific employer
// @route   GET /api/trabajos/employer/:emp_id
// @access  Public
const getTrabajosForEmployer = asyncHandler(async (req, res) => {
    const trabajos = await Trabajo.find({employer_id: req.params.emp_id}, null, { strictQuery: false });
    res.status(200).json(trabajos);
});

// @desc    Create a new job
// @route   POST /api/trabajos
// @access  Public
const createTrabajo = asyncHandler(async (req, res) => {
    const { job_title, job_naics_name, employer_name, salario, requerimientos, employer_id, descripcion, horarios } = req.body;

    if (!job_title || !job_naics_name || !employer_name || !salario || !requerimientos || !employer_id || !descripcion || !horarios) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const trabajo = new Trabajo({
        job_title,
        job_naics_name,
        employer_name,
        salario,
        requerimientos,
        employer_id,
        descripcion,
        horarios,
    });

    console.log("trabajo creado", trabajo);


    const createdTrabajo = await trabajo.save();
    res.status(201).json(createdTrabajo);
});

// @desc    Get job by ID
// @route   GET /api/trabajos/:id
// @access  Public
const getTrabajoById = asyncHandler(async (req, res) => {
    const trabajo = await Trabajo.findById(req.params.id);

    console.log(typeof trabajo.employer_id)

    if (!trabajo) {
        res.status(404);
        throw new Error('Job not found');
    }

    res.status(200).json(trabajo);
});

// @desc    Add a user to the job's applicants list
// @route   PATCH /api/trabajos/:id/aplicantes
// @access  Public
const patchEstudiante = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const trabajo = await Trabajo.findById(id);

    if (!trabajo) {
        res.status(404);
        throw new Error('Job not found');
    }

    if (!trabajo.aplicantes.includes(userId)) {
        trabajo.aplicantes.push(userId);
        await trabajo.save();
    }

    res.status(200).json(trabajo);
});

module.exports = {
    getAllTrabajos,
    getTrabajosForEmployer,
    createTrabajo,
    getTrabajoById,
    patchEstudiante, // Export the new method
};