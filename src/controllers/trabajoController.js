const asyncHandler = require('express-async-handler');
const Trabajo = require('../models/trabajo');
const Empresa = require('../models/empresa');
const mongoose = require("mongoose");
const { Parser } = require('json2csv');

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

    const empresa = await Empresa.findById(employer_id);

    if (!empresa) {
        res.status(404);
        throw new Error('Employer not found');
    }

    // Increment the tot_trabajos field
    empresa.tot_trabajos += 1;

    // Save the updated Empresa document
    await empresa.save();

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


    const createdTrabajo = await trabajo.save();
    res.status(201).json(createdTrabajo);
});

// @desc    Get job by ID
// @route   GET /api/trabajos/:id
// @access  Public
const getTrabajoById = asyncHandler(async (req, res) => {
    const trabajo = await Trabajo.findById(req.params.id);


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

// @desc    Update job data
// @route   PATCH /api/trabajos/:id
// @access  Private
const updateTrabajo = asyncHandler(async (req, res) => {

    const trabajo = await Trabajo.findById(req.params.id);

    if (!trabajo) {
        res.status(404);
        throw new Error('Job not found');
    }

    const { job_title, job_naics_name, employer_name, salario, horarios, requerimientos, descripcion } = req.body;

    if (job_title) trabajo.job_title = job_title;
    if (job_naics_name) trabajo.job_naics_name = job_naics_name;
    if (employer_name) trabajo.employer_name = employer_name;
    if (salario) trabajo.salario = salario;
    if (horarios) trabajo.horarios = horarios;
    if (requerimientos) trabajo.requerimientos = requerimientos;
    if (descripcion) trabajo.descripcion = descripcion;

    const updatedTrabajo = await trabajo.save();
    res.status(200).json(updatedTrabajo);
});

// src/controllers/trabajoController.js

const getActiveTrabajosWithApplicants = asyncHandler(async (req, res) => {
    let trabajos = await Trabajo.aggregate([
        {
            $match: {
                isActive: true
            }
        },
        {
            $unwind: "$aplicantes"
        },
        {
            $lookup: {
                from: "users",
                localField: "aplicantes",
                foreignField: "_id",
                as: "applicant_info"
            }
        },
        {
            $unwind: "$applicant_info"
        },
        {
            $project: {
                job_title: 1,
                "applicant_info.name": 1,
                "applicant_info.email": 1,
                "applicant_info.phone": 1,
                "applicant_info.sector": 1,
                "applicant_info.ingles": 1,
                "applicant_info.formacion": 1,
                "applicant_info.resume": 1
            }
        }
    ]);

    // Remove newlines from applicant_info fields
    trabajos = trabajos.map(trabajo => {
        if (trabajo.applicant_info && trabajo.applicant_info.formacion) {
            trabajo.applicant_info.formacion = trabajo.applicant_info.formacion.replace(/(\r\n|\n|\r)/g, ' ');
        }
        return trabajo;
    });

    if (req.query.format === 'csv') {
        const fields = [
            'job_title',
            'applicant_info.name',
            'applicant_info.email',
            'applicant_info.phone',
            'applicant_info.sector',
            'applicant_info.ingles',
            'applicant_info.formacion',
            'applicant_info.resume'
        ];

        const json2csvParser = new Parser({ fields});
        const csv = json2csvParser.parse(trabajos);

        res.header('Content-Type', 'text/csv');
        res.attachment('trabajos_applicants.csv');
        return res.send(csv);
    }

    res.status(200).json(trabajos);
});


module.exports = {
    getAllTrabajos,
    getTrabajosForEmployer,
    createTrabajo,
    getTrabajoById,
    patchEstudiante,
    updateTrabajo,
    getActiveTrabajosWithApplicants,
};