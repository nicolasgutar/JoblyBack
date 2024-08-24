const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middlewares/errorMiddleware");
const authRoute = require("./routes/authentication");
const adminRoute = require("./routes/empresas");
const trabajoRoute = require("./routes/trabajos");
const { MONGO_URL, PORT } = process.env;

let server;

function shutdown() {
    console.log('Shutting down server...');
    server.close(async () => {
        console.log('Server closed.');

        try {
            await mongoose.connection.close();
            console.log('MongoDB connection closed.');
        } catch (error) {
            console.error('Error closing MongoDB connection:', error);
        }

        process.exit(0);
    });
}

mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.error(err));

server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'thejobly.com', 'www.thejobly.com'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(cookieParser());

app.use(express.json());

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/trabajos", trabajoRoute);

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

app.use(errorHandler);

