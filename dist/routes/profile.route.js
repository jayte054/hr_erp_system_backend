"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoute = void 0;
const express_1 = __importDefault(require("express"));
const employee_profile_controller_1 = require("../controller/userController/employeeController/employee.profile.controller");
exports.profileRoute = express_1.default.Router();
exports.profileRoute.get('/fetchEmployeeProfiles', employee_profile_controller_1.fetchEmployees);
exports.profileRoute.get('/fetchEmployeeProfile', employee_profile_controller_1.fetchEmployeeById);
exports.profileRoute.patch('/admin/updateEmployeeProfile', employee_profile_controller_1.updateEmployeeProfileByAdmin);
exports.profileRoute.patch('/employee/updateEmployeeProfile', employee_profile_controller_1.updateEmployeeProfile);
exports.profileRoute.delete('/admin/delete', employee_profile_controller_1.deleteEmployeeProfile);
exports.profileRoute.get('/admin/fetchEmployeeStata', employee_profile_controller_1.fetchEmployeeStats);
