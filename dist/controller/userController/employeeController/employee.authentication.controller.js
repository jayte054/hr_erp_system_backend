"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeSignin = exports.changePassword = exports.adminEmployeeSignup = void 0;
const employeeModel_1 = require("../../../models/employeeModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const employeeProfileModel_1 = require("../../../models/employeeProfileModel");
const adminEmployeeSignup = async (req, res) => {
    try {
        const { name, email, password, department, role, joiningDate, salary } = req.body; // No need to include adminId here
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const decodedAdmin = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const adminId = decodedAdmin.id;
        // Check if the employee already exists
        const existingEmployee = await employeeModel_1.EmployeeModel.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee already exists' });
        }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Create a new employee
        const newEmployee = new employeeModel_1.EmployeeModel({
            name,
            email,
            password: hashedPassword,
            department,
            role,
            joiningDate,
            salary,
            adminId,
        });
        const newEmployeeProfile = new employeeProfileModel_1.EmployeeProfileModel({
            name,
            email,
            department,
            role,
            joiningDate,
            salary,
        });
        // Save the employee to the database
        await newEmployee.save();
        await newEmployeeProfile.save();
        // Respond with a success message
        res.status(201).json({ message: 'Employee signed up successfully', employee: { id: newEmployee._id, name, email } });
    }
    catch (error) {
        console.error('Error during employee sign-up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.adminEmployeeSignup = adminEmployeeSignup;
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const employeeId = req.params.id;
    try {
        const employee = await employeeModel_1.EmployeeModel.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        //compare password
        const comparePassword = await bcrypt_1.default.compare(currentPassword, employee.password);
        if (!comparePassword) {
            res.status(401).json({ message: 'current password is incorrect' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(newPassword, saltRounds);
        employee.password = hashedPassword;
        await employee.save();
        return res.status(200).json({ message: 'Password successfully changed' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.changePassword = changePassword;
const employeeSignin = async (req, res) => {
    const { email, password } = req.body;
    try {
        //find employee
        const employee = await employeeModel_1.EmployeeModel.findOne({ where: { email } });
        if (!employee) {
            return res.status(404).json({ message: 'employee not found' });
        }
        //compare password
        const comparePassword = await bcrypt_1.default.compare(password, employee.password);
        if (!comparePassword) {
            res.status(401).json({ message: 'current password is incorrect' });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        //Generate Token 
        const token = jsonwebtoken_1.default.sign({
            id: employee._id,
            email: employee.email,
            role: employee.role,
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });
        return res.status(200).json({ message: 'Sign in successful', token });
    }
    catch (error) {
        return res.status(500).json({ message: 'internal server error' });
    }
};
exports.employeeSignin = employeeSignin;
