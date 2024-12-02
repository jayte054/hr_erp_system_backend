import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import { authRoute, profileRoute } from "./routes";
import { mongoDbConnection } from "./config/database";

dotenv.config();

const app = express();

mongoDbConnection()

const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.use('/api/user', authRoute);
app.use('/api/profile', profileRoute)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
