import express, { Request, Response } from 'express';
import { EmployeeModel } from '../../../models/employeeModel'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { employeeSignupValidationSchema, generateSalt } from '../../../utils/authenticationUtils';
import { EmployeeProfileModel } from '../../../models/employeeProfileModel';
import {v4 as uuid} from 'uuid'


export const adminEmployeeSignup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, department, salary } = req.body; // No need to include adminId here
    
    const {error} = employeeSignupValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message }); // Send validation error message
    }

    const token: any = req.header('Authorization')?.replace('Bearer ', '')

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const decodedAdmin: any = jwt.verify(token, process.env.JWT_SECRET)

    const adminId = decodedAdmin.id


    // Check if the employee already exists
    const existingEmployee = await EmployeeModel.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new employee
    const newEmployee = new EmployeeModel({
      id: uuid(),
      name,
      email,
      password: hashedPassword,
      department,
      joiningDate: new Date(),
      role: "employee",
      salary, 
      adminId, 
    });

    const newEmployeeProfile = new EmployeeProfileModel({
        employeeId: newEmployee.id,
        name,
        email,
        department,
        role: "employee",
        joiningDate: new Date(),
        salary, 
    })

    // Save the employee to the database
    await newEmployee.save();
    
    await newEmployeeProfile.save();

    // Respond with a success message
    res.status(201).json({ message: 'Employee signed up successfully', employee: { id: newEmployee._id, name, email } });
  } catch (error) {
    console.error('Error during employee sign-up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const changePassword = async (req: Request, res: Response): Promise<Response | any> => {
  console.log(req.body)
    const {currentPassword, newPassword} = req.body;
    const employeeId= req.params.id
    try {
        const employee = await EmployeeModel.findById(employeeId);
        if(!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        //compare password
        const comparePassword = await bcrypt.compare(currentPassword, employee.password)
        if (!comparePassword) {
            res.status(401).json({message: 'current password is incorrect'})
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        employee.password = hashedPassword;

        await employee.save()
        return res.status(200).json({message: 'Password successfully changed'})

    } catch(error) {
      console.log(error)
        return res.status(500).json({ message: 'Internal server error' });

    }
}

export const employeeSignin = async (req: Request, res: Response): Promise<Response | any> => {
    const {email, password} = req.body;

    try {
        //find employee
        const employee = await EmployeeModel.findOne({email})
        if (!employee) {
            return res.status(404).json({message: 'employee not found'})
        }
        //compare password
        const comparePassword = await bcrypt.compare(password, employee.password);
        if (!comparePassword) {
           return res.status(401).json({message: 'current password is incorrect'})
        }

        if (!process.env.JWT_SECRET) {
            return new Error('JWT_SECRET is not defined in environment variables');
        }

        //Generate Token 
        const token = jwt.sign(
        {
            id: employee._id,
            employeeId: employee.id,
            email: employee.email,
            role: employee.role,
        }, 
          process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION
        })
        return res.status(200).json({
          message: 'Sign in successful', 
          token,
          user: {
            id: employee._id, employeeId: employee.id, email: employee.email, role: employee.role, name: employee.name
          }
        })
    } catch (error) {
        return res.status(500).json({message: 'internal server error'})
    }
}