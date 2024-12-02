"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeProfileModel = void 0;
const mongoose_1 = require("mongoose");
const employeeProfileSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    salary: { type: Number, required: true },
});
exports.EmployeeProfileModel = (0, mongoose_1.model)('EmployeeProfile', employeeProfileSchema);
