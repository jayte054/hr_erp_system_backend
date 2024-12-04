import mongoose, { Schema, model, Document } from 'mongoose';
import { Admin } from './adminModel'; // Adjust the import based on your project structure

export interface EmployeeProfile extends Document {
    employeeId: string;
    name: string;
    email: string;
    department: string;
    role: string;
    joiningDate: Date;
    salary: number;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeProfile:
 *       type: object
 *       required:
 *         - employeeId
 *         - name
 *         - email
 *         - department
 *         - role
 *         - joiningDate
 *         - salary
 *       properties:
 *         employeeId:
 *           type: string
 *           description: Unique identifier for the employee.
 *         name:
 *           type: string
 *           description: Name of the employee.
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the employee (must be unique).
 *         department:
 *           type: string
 *           description: Department of the employee.
 *         role:
 *           type: string
 *           description: Role of the employee (e.g., manager, staff).
 *         joiningDate:
 *           type: string
 *           format: date
 *           description: The date the employee joined the company.
 *         salary:
 *           type: number
 *           description: Salary of the employee.
 */

const employeeProfileSchema = new Schema<EmployeeProfile>({
    employeeId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    salary: { type: Number, required: true },
});

export const EmployeeProfileModel = model<EmployeeProfile>('EmployeeProfile', employeeProfileSchema);