import mongoose from "mongoose";

const MONGO_URL = 'mongodb+srv://gutierrez23nicolas:Ni-200422@cluster0.si6d4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URL);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}