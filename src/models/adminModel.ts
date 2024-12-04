import mongoose, { Schema, Document } from "mongoose";

export interface Admin extends Document {
    name: string;
    email: string;
    password: string;
    salt: string;
    role: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - password
 *         - salt
 *         - department
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the admin.
 *         name:
 *           type: string
 *           description: Name of the admin.
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the admin.
 *         password:
 *           type: string
 *           description: Password of the admin (hashed).
 *         salt:
 *           type: string
 *           description: Salt used for hashing the password.
 *         department:
 *           type: string
 *           description: Department of the admin.
 *         role:
 *           type: string
 *           description: Role of the admin (e.g., admin, manager).
 */

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