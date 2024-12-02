import express from 'express';
import { deleteEmployeeProfile, fetchEmployeeById, fetchEmployeeStats, fetchEmployees, updateEmployeeProfile, updateEmployeeProfileByAdmin} from '../controller/userController/employeeController/employee.profile.controller';

export const profileRoute = express.Router()

profileRoute.get('/fetchEmployeeProfiles', fetchEmployees)
profileRoute.get('/fetchEmployeeProfile', fetchEmployeeById)
profileRoute.patch('/admin/updateEmployeeProfile', updateEmployeeProfileByAdmin)
profileRoute.patch('/employee/updateEmployeeProfile', updateEmployeeProfile)
profileRoute.delete('/admin/delete', deleteEmployeeProfile)
profileRoute.get('/admin/fetchEmployeeStata', fetchEmployeeStats)