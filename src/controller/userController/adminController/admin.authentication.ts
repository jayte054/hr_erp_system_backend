import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { AdminSignInValidationSchema, AdminSignupValidationSchema, generatePassword, signInError, signupError } from "../../../utils/authenticationUtils";
import { AdminModel, Admin } from '../../../models/adminModel';
import jwt from 'jsonwebtoken';
import {v4 as uuid} from 'uuid'
import { EmployeeProfileModel } from '../../../models/employeeProfileModel';

export const adminSignup = async (req: Request, res: Response): Promise<any> => {
    try {
        const {name, email, password, department,salary} = req.body;

        const salt = await bcrypt.genSalt();
        const {error} = AdminSignupValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message }); // Send validation error message
        }

        const hashedPassword = await generatePassword(password, salt);

        const checkAdmin = await AdminModel.findOne({where: email})

        if (!checkAdmin) {
        const newAdmin: Admin = new AdminModel({
            id: uuid(),
            name,
            email,
            salt,
            password: hashedPassword,
            department,
            role: "admin",
            salary,
        }) 
        console.log(newAdmin)
        const newadminProfile = new EmployeeProfileModel({
            employeeId: newAdmin.id,
            name,
            email,
            department,
            role: "employee",
            joiningDate: new Date(),
            salary
        })
       console.log(newadminProfile)

         const admin = await newAdmin.save()
         await newadminProfile.save()

         return res.status(201).json({
            message: 'admin created successfully',
            data: admin,
        })
        }
        
    } catch (error: any) {
        return signupError(error, res)
    }
}


export const adminSignin = async(req: Request, res: Response): Promise<any> =>  {
    const {email, password} = req.body;

    const {error} = AdminSignInValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message }); // Send validation error message
    }

    try {
        // console.log(await AdminModel.find())
        console.log(email, password)
        const admin = await AdminModel.findOne({email: email.trim().toLowerCase()});
        console.log(admin)

        if(!admin) {
            return res.status(401).json({
                error: 'invalid signin details'
            })
        }

        //Compare password
        const comparePassword = await bcrypt.compare(password, admin.password)

        if (!comparePassword) {
            return res.status(401).json({
                error: 'incorrect user details'
            })
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        //Generate Token 
        const token = jwt.sign(
        {
            id: admin._id,
            email: admin.email,
            role: admin.role,
        }, 
          process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION
        })

        return res.status(200).json({message: 'Sign in successful', token})
    } catch (error: any) {
        console.error(error);
         signInError(error, res)
    }
}