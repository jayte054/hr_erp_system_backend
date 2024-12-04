import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { authRoute, profileRoute } from "./routes";
import  config  from './config/index';
import { mongoDbConnection } from "./config/database";

dotenv.config();

const app = express();

app.use(cors());

// const corsOptions = {
//     origin: "",
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true
// }

// app.use(cors(corsOptions));

mongoDbConnection()

const port = config.PORT;

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.use('/api/user', authRoute);
app.use('/api/profile', profileRoute)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
