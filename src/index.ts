import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import { swaggerDocs } from "./utils/swagger";
import cors from 'cors';
import { authRoute, profileRoute } from "./routes";
import  config  from './config/index';
import { mongoDbConnection } from "./config/database";

dotenv.config();

const app = express();

app.use(cors({ origin : '*'}))

app.options('*', cors())

// app.use(cors({ origin: 'https://hr-erp-system-frontend.onrender.com/' }));

// const corsOptions = {
//   origin: (origin: any, callback: any) => {
//     const allowedOrigins = [
//       "https://hr-erp-system-frontend.vercel.app",
//       "http://localhost:3000",
//       'http://127.0.0.1:5173'
//     ];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//         console.log(new Error('not allowed by cors'))
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

// const corsOptions = {
    // origin: [
    //     "https://hr-erp-system-frontend.vercel.app", // Production frontend
    //     "http://localhost:3000", // Local frontend
    //     "http://127.0.0.1:5173"  // Ensure this matches your dev server URL
    // ],
//     origin: '*',
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true // if you need to include cookies in requests
// };

// Apply CORS middleware
// app.use(cors(corsOptions));

mongoDbConnection()

const port = config.PORT;

// Middleware to parse JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

swaggerDocs(app);

// route
app.use('/api/user', authRoute);
app.use('/api/profile', profileRoute)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
