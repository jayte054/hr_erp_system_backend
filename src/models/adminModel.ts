import mongoose, { Schema, Document } from "mongoose";

export interface Admin extends Document {
    name: string;
    email: string;
    password: string;
    salt: string;
    role: string;
}

export const AdminSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

export const AdminModel = mongoose.model<Admin>('Admin', AdminSchema)