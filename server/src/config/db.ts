import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            console.error("MONGO_URI is not defined in the .env file");
            process.exit(1); // Exit process with failure
        }

        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully.");

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;