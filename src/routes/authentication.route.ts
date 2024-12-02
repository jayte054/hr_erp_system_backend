import express  from 'express';

import { changePassword, employeeSignin, adminEmployeeSignup } from '../controller/userController/employeeController/employee.authentication.controller';
import { adminSignup, adminSignin } from '../controller/userController/adminController/admin.authentication';

export const authRoute = express.Router()

authRoute.post('/signup', adminEmployeeSignup )
authRoute.post('/signup', employeeSignin )
authRoute.post('/adminSignup', adminSignup )
authRoute.post('/adminSignin', adminSignin )
authRoute.patch('/changePassword', changePassword)