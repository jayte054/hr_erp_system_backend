import express  from 'express';

import { changePassword, employeeSignin, adminEmployeeSignup } from '../controller/userController/employeeController/employee.authentication.controller';
import { adminSignup, adminSignin } from '../controller/userController/adminController/admin.authentication';

export const authRoute = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     tags: [Auth]
 *     summary: Sign up as an admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               department:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Validation error
 *       409:
 *         description: Conflict - Admin already exists
 */
authRoute.post('/signup', adminEmployeeSignup )


/**
 * @swagger
 * /signin:
 *   post:
 *     tags: [Auth]
 *     summary: Sign in as an admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sign in successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid signin details
 */


authRoute.post('/signin', employeeSignin )

/**
 * @swagger
 * /adminSignup:
 *   post:
 *     tags: [Auth]
 *     summary: Sign up as an admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               department:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Validation error
 *       409:
 *         description: Conflict - Admin already exists
 */

authRoute.post('/adminSignup', adminSignup )

/**
 * @swagger
 * /adminSignin:
 *   post:
 *     tags: [Auth]
 *     summary: Sign in as an admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sign in successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid signin details
 */

authRoute.post('/adminSignin', adminSignin )

/**
 * @swagger
 * /changePassword/{id}:
 *   patch:
 *     tags: [Auth]
 *     summary: Change the password of an admin
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the admin
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Admin not found
 */
authRoute.patch('/changePassword/:id', changePassword)