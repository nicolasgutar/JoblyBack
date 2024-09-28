const mongoose = require("mongoose");

const AplicacionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trabajo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Trabajo', required: true },
    response: { type: String, default: 'pending' },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Aplicacion", AplicacionSchema);