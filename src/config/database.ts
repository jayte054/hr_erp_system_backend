import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const mongoDbConnection = async (): Promise<void> => {
    const mongoURI = process.env.MONGO_URI || "";

    if (!mongoURI) {
        throw new Error("MongoDB URI is not defined in .env file.");
    }

    try {
        await mongoose.connect(mongoURI, {
            autoCreate: true,
            ssl: true,
            tlsAllowInvalidCertificates: false,
            tlsAllowInvalidHostnames: false,
        });

        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}