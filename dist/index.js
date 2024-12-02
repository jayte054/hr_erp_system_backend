"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const database_1 = require("./config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, database_1.mongoDbConnection)();
const port = process.env.PORT || 3000;
// Middleware to parse JSON
app.use(express_1.default.json());
// Sample route
app.use('/api/user', routes_1.authRoute);
app.use('/api/profile', routes_1.profileRoute);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
