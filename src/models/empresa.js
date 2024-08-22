const mongoose = require("mongoose");

const EmpresaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    contacto: { type: String, required: true },
    descripcion: { type: String, required: true },
    tot_trabajos: { type: Number, required: true },
}
);

module.exports = mongoose.model("Empresa", EmpresaSchema);