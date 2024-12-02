"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const employee_authentication_controller_1 = require("../controller/userController/employeeController/employee.authentication.controller");
const admin_authentication_1 = require("../controller/userController/adminController/admin.authentication");
exports.authRoute = express_1.default.Router();
exports.authRoute.post('/signup', employee_authentication_controller_1.adminEmployeeSignup);
exports.authRoute.post('/signup', employee_authentication_controller_1.employeeSignin);
exports.authRoute.post('/adminSignup', admin_authentication_1.adminSignup);
exports.authRoute.post('/adminSignin', admin_authentication_1.adminSignin);
exports.authRoute.patch('/changePassword', employee_authentication_controller_1.changePassword);
