"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDbConnection = async () => {
    const mongoURI = process.env.MONGO_URI || "";
    if (!mongoURI) {
        throw new Error("MongoDB URI is not defined in .env file.");
    }
    try {
        await mongoose_1.default.connect(mongoURI, {
            autoCreate: true
        });
        console.log("Connected to MongoDB successfully.");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
};
exports.mongoDbConnection = mongoDbConnection;
