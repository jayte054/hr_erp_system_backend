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