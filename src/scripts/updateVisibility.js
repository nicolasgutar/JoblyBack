const mongoose = require('mongoose');
const Aplicacion = require('../models/aplicacion');
const dotenv = require('dotenv');

dotenv.config();

const updateVisibility = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Aplicacion.updateMany({}, { $set: { visibility: true } });

        console.log('Visibility field updated for all existing applications');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error updating visibility field:', error);
        process.exit(1);
    }
};

updateVisibility();