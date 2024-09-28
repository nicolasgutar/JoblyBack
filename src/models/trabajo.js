const mongoose = require("mongoose");

const TrabajoSchema = new mongoose.Schema({
    job_title: { type: String, required: true },
    job_naics_name: { type: String, required: true },
    employer_name: { type: String, required: true },
    salario: { type: String, required: true },
    requerimientos: { type: String, required: true },
    employer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
    descripcion: { type: String, required: true },
    isActive: { type: Boolean, required: false, default: true },
    aplicantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    horarios: { type: String, required: true, default:'sin horario' },
    job_city: { type: String },
});

module.exports = mongoose.model("Trabajo", TrabajoSchema);

