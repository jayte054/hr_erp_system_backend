import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import { swaggerDocs } from "./utils/swagger";
import cors from 'cors';
import { authRoute, profileRoute } from "./routes";
import  config  from './config/index';
import { mongoDbConnection } from "./config/database";

dotenv.config();

const app = express();

// app.use(cors())

// app.use(cors({ origin: 'https://hr-erp-system-backend.onrender.com' }));

// const corsOptions = {
//   origin: (origin: any, callback: any) => {
//     const allowedOrigins = [
//       "https://hr-erp-system-frontend.vercel.app",
//       "http://localhost:3000",
//     ];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   preFlightContinue: false,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

// app.options('*', cors(corsOptions))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(204).end(); // Respond with success for preflight
    } else {
        next();
    }
});

mongoDbConnection()

const port = config.PORT;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    // console.log('Request URL:', req.url);
    // console.log('Request Method:', req.method);
    // console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body); // Check parsed body
    next();
});
// swaggerDocs(app);

// route
app.use('/api/user', authRoute);
app.use('/api/profile', profileRoute)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
