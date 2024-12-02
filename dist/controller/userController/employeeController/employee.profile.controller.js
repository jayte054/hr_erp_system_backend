"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEmployeeStats = exports.deleteEmployeeProfile = exports.updateEmployeeProfile = exports.updateEmployeeProfileByAdmin = exports.fetchEmployeeById = exports.fetchEmployees = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const employeeProfileModel_1 = require("../../../models/employeeProfileModel");
const employeeModel_1 = require("../../../models/employeeModel");
const fetchEmployees = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const SECRET_KEY = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (!token && !decoded) {
            return res.status(401).json({ message: 'user not authorized' });
        }
        // Default pagination values
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        if (page <= 0 || limit <= 0) {
            return res.status(400).json({ message: "Page and limit must be positive numbers" });
        }
        const totalCount = await employeeProfileModel_1.EmployeeProfileModel.countDocuments();
        const employees = await employeeProfileModel_1.EmployeeProfileModel.find()
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(200).json({
            message: 'employees fetched successfully',
            currentPage: +page,
            totalPages: Math.ceil(totalCount / +limit),
            totalCount,
            data: employees
        });
    }
    catch (error) {
        return res.status(500).json({ message: "An error occurred while fetching the employee." });
    }
};
exports.fetchEmployees = fetchEmployees;
const fetchEmployeeById = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        const SECRET_KEY = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const employeeId = decoded._id;
        const employee = await employeeProfileModel_1.EmployeeProfileModel.findById(employeeId);
        if (!employee) {
            res.status(401).json({ message: 'employee not found' });
        }
        res.status(200).json({
            message: 'employee fetched successfully',
            data: employee
        });
    }
    catch (error) {
        return res.status(500).json({ message: "An error occurred while fetching the employee." });
    }
};
exports.fetchEmployeeById = fetchEmployeeById;
const updateEmployeeProfileByAdmin = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        // Verify the token
        const SECRET_KEY = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }
        if (decoded.role !== "admin") {
            return res.status(401).json({ message: 'user not authorized' });
        }
        const employeeId = decoded._id;
        const updateData = req.body;
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No update data provided." });
        }
        const updatedEmployee = await employeeProfileModel_1.EmployeeProfileModel.findByIdAndUpdate(employeeId, { $set: updateData }, { new: true, runValidators: true });
        await employeeModel_1.EmployeeModel.findByIdAndUpdate(employeeId, { $set: updateData }, { new: true, runValidators: true });
        return res.status(200).json({
            message: "Profile updated successfully.",
            data: updatedEmployee,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "An error occurred while updating the employee." });
    }
};
exports.updateEmployeeProfileByAdmin = updateEmployeeProfileByAdmin;
const updateEmployeeProfile = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        // Verify the token
        const SECRET_KEY = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }
        const employeeId = decoded._id;
        const { name, email, department } = req.body;
        const updateData = {
            name,
            email,
            department
        };
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No update data provided." });
        }
        const updatedEmployeeProfile = await employeeProfileModel_1.EmployeeProfileModel.findByIdAndUpdate(employeeId, { $set: updateData }, { new: true, runValidators: true });
        await employeeModel_1.EmployeeModel.findByIdAndUpdate(employeeId, { $set: updateData }, { new: true, runValidators: true });
        return res.status(200).json({
            message: "Profile updated successfully.",
            data: updatedEmployeeProfile,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "An error occurred while updating the employee." });
    }
};
exports.updateEmployeeProfile = updateEmployeeProfile;
const deleteEmployeeProfile = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        // Verify the token
        const SECRET_KEY = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }
        const employeeId = decoded._id;
        await employeeProfileModel_1.EmployeeProfileModel.findByIdAndDelete(employeeId);
        await employeeModel_1.EmployeeModel.findByIdAndDelete(employeeId);
        return res.status(200).json({
            message: 'employee data successfully deleted'
        });
    }
    catch (error) {
        return res.status(500).json({ message: "An error occurred while deleting the employee." });
    }
};
exports.deleteEmployeeProfile = deleteEmployeeProfile;
const fetchEmployeeStats = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        const SECRET_KEY = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }
        const totalNumberOfEmployees = await employeeProfileModel_1.EmployeeProfileModel.countDocuments();
        const departmentStats = await employeeProfileModel_1.EmployeeProfileModel.aggregate([
            { $group: { _id: "$department", count: { $sum: 1 } } },
            { $project: { department: "$_id", count: 1, _id: 0 } }
        ]);
        return res.status(200).json({
            message: "Employee statistics fetched successfully.",
            totalNumberOfEmployees,
            departments: departmentStats,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "An error occurred while fetching the statistics." });
    }
};
exports.fetchEmployeeStats = fetchEmployeeStats;
