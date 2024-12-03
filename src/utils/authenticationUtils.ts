import { Response } from "express";
import bcrypt from 'bcrypt';
import * as Joi from 'joi';

export const signupError = (error: Error, res: Response) => {
    return res.status(500).json({error: error, message: 'error signin up'})
}

export const signInError = (error: Error, res: Response) => {
    return res.status(500).json({ error: error, message: 'error signing in' });
}

export const generateSalt = async() => await bcrypt.genSalt()

export const generatePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
} 

export const AdminSignupValidationSchema  = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    salary: Joi.number().required(),
    department:Joi.string().required(),
})

export const AdminSignInValidationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const employeeSignupValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    department: Joi.string().required(),
    salary: Joi.number().required(),
});