const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: {type: String, required: true},
    phone: { type: String, required: true },
    sector: { type: String, required: true },
    createdAt:{type:Date, default:new Date()},
    role: { type: String, default: 'user' },
},
{
    timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);
