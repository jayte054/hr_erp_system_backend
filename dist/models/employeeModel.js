"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
const mongoose_1 = require("mongoose");
const employeeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    salary: { type: Number, required: true },
    adminId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Reference to Admin
});
exports.EmployeeModel = (0, mongoose_1.model)('Employee', employeeSchema);
