import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import { swaggerDocs } from "./utils/swagger";
import cors from 'cors';
import { authRoute, profileRoute } from "./routes";
import  config  from './config/index';
import { mongoDbConnection } from "./config/database";

dotenv.config();

const app = express();

// app.use(cors());

const corsOptions = {
  origin: (origin: any, callback: any) => {
    const allowedOrigins = [
      "https://hr-erp-system-frontend.vercel.app",
      "http://localhost:3000",
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preFlightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions))

mongoDbConnection()

const port = config.PORT;

// Middleware to parse JSON
app.use(express.json());

// swaggerDocs(app);

// route
app.use('/api/user', authRoute);
app.use('/api/profile', profileRoute)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
