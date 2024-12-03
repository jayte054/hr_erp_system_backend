import express from 'express';
import { deleteEmployeeProfile, fetchEmployeeByIdAdmin, fetchEmployeeById, fetchEmployeeStats, fetchEmployees, updateEmployeeProfile, updateEmployeeProfileByAdmin} from '../controller/userController/employeeController/employee.profile.controller';

export const profileRoute = express.Router()

profileRoute.get('/fetchEmployeeProfiles', fetchEmployees)
profileRoute.get('/fetchEmployeeProfile/:id', fetchEmployeeById)
profileRoute.get('/admin/fetchEmployeeProfile/:id', fetchEmployeeByIdAdmin)
profileRoute.patch('/admin/updateEmployeeProfile/:id', updateEmployeeProfileByAdmin)
profileRoute.patch('/employee/updateEmployeeProfile/:id', updateEmployeeProfile)
profileRoute.delete('/admin/delete/:id', deleteEmployeeProfile)
profileRoute.get('/admin/fetchEmployeeStata', fetchEmployeeStats)