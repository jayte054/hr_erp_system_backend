import mongoose, { Schema, model, Document } from 'mongoose';
import { Admin } from './adminModel'; // Adjust the import based on your project structure

export interface Employee extends Document {
    employeeId: string;
    name: string;
    email: string;
    password: string;
    department: string;
    role: string;
    joiningDate: Date;
    salary: number;
    adminId: mongoose.Schema.Types.ObjectId; // Add this line to include the admin ID
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - password
 *         - department
 *         - role
 *         - joiningDate
 *         - salary
 *         - adminId
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the employee.
 *         name:
 *           type: string
 *           description: Name of the employee.
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the employee (must be unique).
 *         password:
 *           type: string
 *           description: Password of the employee (hashed).
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
 *         adminId:
 *           type: string
 *           description: Unique identifier of the admin who manages this employee (reference to Admin).
 */

const employeeSchema = new Schema<Employee>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    salary: { type: Number, required: true },
    adminId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true }, // Reference to Admin
});

export const EmployeeModel = model<Employee>('Employee', employeeSchema);