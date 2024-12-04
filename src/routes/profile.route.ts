import express from 'express';
import { deleteEmployeeProfile, fetchEmployeeByIdAdmin, fetchEmployeeById, fetchEmployeeStats, fetchEmployees, updateEmployeeProfile, updateEmployeeProfileByAdmin} from '../controller/profileController/employee.profile.controller';

export const profileRoute = express.Router()

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee management
 */

/**
 * @swagger
 * /fetchEmployeeProfiles:
 *   get:
 *     tags: [Employee]
 *     summary: Fetch all employee profiles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Employees fetched successfully
 *       401:
 *         description: User not authorized
 *       500:
 *         description: An error occurred while fetching employees
 */

profileRoute.get('/fetchEmployeeProfiles', fetchEmployees)

/**
 * @swagger
 * /fetchEmployeeProfile/{email}:
 *   get:
 *     tags: [Employee]
 *     summary: Fetch a specific employee profile by email
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email of the employee to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee fetched successfully
 *       401:
 *         description: User not authorized or not allowed to view profile
 *       404:
 *         description: Employee not found
 *       500:
 *         description: An error occurred while fetching the employee
 */
profileRoute.get('/fetchEmployeeProfile/:email', fetchEmployeeById)

/**
 * @swagger
 * /admin/fetchEmployeeProfile/{id}:
 *   get:
 *     tags: [Employee]
 *     summary: Fetch an employee profile by ID (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee fetched successfully
 *       401:
 *         description: User not authorized
 *       404:
 *         description: Employee not found
 *       500:
 *         description: An error occurred while fetching the employee
 */
profileRoute.get('/admin/fetchEmployeeProfile/:id', fetchEmployeeByIdAdmin)

/**
 * @swagger
 * /admin/updateEmployeeProfile/{id}:
 *   patch:
 *     tags: [Employee]
 *     summary: Update an employee profile by ID (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: Employee data to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             department:
 *               type: string
 *             joiningDate:
 *               type: string
 *               format: date
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: User not authorized
 *       400:
 *         description: No update data provided
 *       500:
 *         description: An error occurred while updating the employee
 */
profileRoute.patch('/admin/updateEmployeeProfile/:id', updateEmployeeProfileByAdmin)

/**
 * @swagger
 * /employee/updateEmployeeProfile/{id}:
 *   patch:
 *     tags: [Employee]
 *     summary: Update own employee profile by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: Employee data to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             department:
 *               type: string
 *             joiningDate:
 *               type: string
 *               format: date
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: User not authorized
 *       400:
 *         description: No update data provided
 *       500:
 *         description: An error occurred while updating the employee
 */
profileRoute.patch('/employee/updateEmployeeProfile/:id', updateEmployeeProfile)

/**
 * @swagger
 * /admin/delete/{id}:
 *   delete:
 *     tags: [Employee]
 *     summary: Delete an employee profile by ID (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee data successfully deleted
 *       401:
 *         description: User not authorized
 *       404:
 *         description: Employee not found
 *       500:
 *         description: An error occurred while deleting the employee
 */
profileRoute.delete('/admin/delete/:id', deleteEmployeeProfile)

/**
 * @swagger
 * /admin/fetchEmployeeStats:
 *   get:
 *     tags: [Employee]
 *     summary: Fetch employee statistics (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee statistics fetched successfully
 *       401:
 *         description: User not authorized
 *       500:
 *         description: An error occurred while fetching the statistics
 */
profileRoute.get('/admin/fetchEmployeeStata', fetchEmployeeStats)