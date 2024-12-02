"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeSignupValidationSchema = exports.AdminSignInValidationSchema = exports.AdminSignupValidationSchema = exports.generatePassword = exports.generateSalt = exports.signInError = exports.signupError = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Joi = __importStar(require("joi"));
const signupError = (error, res) => {
    return res.status(500).json({ error: error, message: 'error signin up' });
};
exports.signupError = signupError;
const signInError = (error, res) => {
    return res.status(500).json({ error: error, message: 'error signing in' });
};
exports.signInError = signInError;
const generateSalt = async () => await bcrypt_1.default.genSalt();
exports.generateSalt = generateSalt;
const generatePassword = async (password, salt) => {
    return await bcrypt_1.default.hash(password, salt);
};
exports.generatePassword = generatePassword;
exports.AdminSignupValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    salt: Joi.string().required(),
    department: Joi.string().required(),
    role: Joi.string().required(),
});
exports.AdminSignInValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});
exports.employeeSignupValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    department: Joi.string().required(),
    role: Joi.string().required(),
    joiningDate: Joi.date().required(),
    salary: Joi.number().required(),
});
