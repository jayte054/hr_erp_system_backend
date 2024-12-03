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