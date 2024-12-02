"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSignin = exports.adminSignup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authenticationUtils_1 = require("../../../utils/authenticationUtils");
const adminModel_1 = require("../../../models/adminModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminSignup = async (req, res) => {
    try {
        const { error } = authenticationUtils_1.AdminSignupValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message }); // Send validation error message
        }
        const { name, email, password, department, role } = req.body;
        const salt = await bcrypt_1.default.genSalt();
        const hashedPassword = await (0, authenticationUtils_1.generatePassword)(password, salt);
        const checkAdmin = await adminModel_1.AdminModel.findOne({ where: email });
        if (!checkAdmin) {
            const newAdmin = new adminModel_1.AdminModel({
                name,
                email,
                salt,
                password: hashedPassword,
                role
            });
            const admin = await newAdmin.save();
            return res.status(201).json({
                message: 'admin created successfully',
                data: admin,
            });
        }
    }
    catch (error) {
        return (0, authenticationUtils_1.signupError)(error, res);
    }
};
exports.adminSignup = adminSignup;
const adminSignin = async (req, res) => {
    const { email, password } = req.body;
    const { error } = authenticationUtils_1.AdminSignInValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message }); // Send validation error message
    }
    try {
        const admin = await adminModel_1.AdminModel.findOne({ where: { email } });
        if (!admin) {
            return res.status(401).json({
                error: 'invalid signin details'
            });
        }
        //Compare password
        const comparePassword = await bcrypt_1.default.compare(password, admin.password);
        if (!comparePassword) {
            return res.status(401).json({
                error: 'incorrect user details'
            });
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        //Generate Token 
        const token = jsonwebtoken_1.default.sign({
            id: admin._id,
            email: admin.email,
            role: admin.role,
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });
        return res.status(200).json({ message: 'Sign in successful', token });
    }
    catch (error) {
        console.error(error);
        (0, authenticationUtils_1.signInError)(error, res);
    }
};
exports.adminSignin = adminSignin;
