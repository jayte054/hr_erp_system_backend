import { Request, Response } from "express"
import jwt from 'jsonwebtoken';
import { EmployeeProfileModel } from "../../../models/employeeProfileModel"
import { EmployeeModel } from "../../../models/employeeModel";

export const fetchEmployees = async (req: Request, res: Response): Promise<any> => {
    try {
        const token: any = req.header('Authorization')?.replace('Bearer ', '')
        const SECRET_KEY: any = process.env.JWT_SECRET
        const decoded: any = jwt.verify(token, SECRET_KEY);
        console.log(decoded)

        if ( decoded.role === "employee") {
            return res.status(401).json({message: 'user not authorized'})
        }

        
         // Default pagination values
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        if (page <= 0 || limit <= 0) {
        return res.status(400).json({ message: "Page and limit must be positive numbers" });
        }

        const totalCount = await EmployeeProfileModel.countDocuments();

        const employees = await EmployeeProfileModel.find()
            .skip((page - 1) * limit)
            .limit(limit);

        return res.status(200).json({
            message: 'employees fetched successfully',
            currentPage: +page,
            totalPages: Math.ceil(totalCount / +limit),
            totalCount,
            data: employees
        })
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while fetching the employee." });
    }
} 

export const fetchEmployeeById = async (req: Request, res: Response): Promise<any> => {
    try {

        const token: any = req.header('Authorization')?.replace('Bearer ', '')


        const SECRET_KEY: any = process.env.JWT_SECRET
        const decoded: any = jwt.verify(token, SECRET_KEY);
        console.log(decoded)

        if (!decoded) {
            return res.status(401).json({message: 'user not authorized'})
        }
        const employeeId = req.params.id
        console.log(employeeId)
       
        const employee: any = await EmployeeProfileModel.findById(employeeId)

        if(decoded.email !== employee.email) {
            return res.status(401).json({message: 'user not allowed to view profile'})
        }

        if (!employee) {
            res.status(401).json({message: 'employee not found'})
        }

        res.status(200).json({
            message: 'employee fetched successfully',
            data: employee
        })
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while fetching the employee." });
    }
}

export const fetchEmployeeByIdAdmin = async (req: Request, res: Response): Promise<any> => {
    try {

        const token: any = req.header('Authorization')?.replace('Bearer ', '')


        const SECRET_KEY: any = process.env.JWT_SECRET
        const decoded: any = jwt.verify(token, SECRET_KEY);
        console.log(decoded)

        if (!decoded) {
            return res.status(401).json({message: 'user not authorized'})
        }
        const employeeId = req.params.id
        console.log(employeeId)
       
        const employee: any = await EmployeeProfileModel.findById(employeeId)


        if (!employee) {
            res.status(401).json({message: 'employee not found'})
        }

        res.status(200).json({
            message: 'employee fetched successfully',
            data: employee
        })
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while fetching the employee." });
    }
}

export const updateEmployeeProfileByAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    const SECRET_KEY: any = process.env.JWT_SECRET;

    const decoded: any = jwt.verify(token, SECRET_KEY);

    if(!decoded) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }

    if(decoded.role !== "admin") {
        return res.status(401).json({message: 'user not authorized'})
    }

    const employeeId = req.params.id

    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No update data provided." });
      }

      const updatedEmployeeProfile: any = await EmployeeProfileModel.findByIdAndUpdate(
        employeeId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      console.log("mm", updatedEmployeeProfile)
      await updatedEmployeeProfile?.save()

      const _employee: any = await EmployeeModel.findOne({id: updatedEmployeeProfile.employeeId})
      console.log(_employee)
      const updatedEmployee: any = await EmployeeModel.findOne({id: _employee.id})
      const _updatedEmployee: any = await EmployeeModel.findByIdAndUpdate(
        updatedEmployee._id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
        await _updatedEmployee?.save()
      return res.status(200).json({
        message: "Profile updated successfully.",
        data: _updatedEmployee,
      });
    
    }catch (error) {
        console.log(error)
        return res.status(500).json({ message: "An error occurred while updating the employee." });

    }
}

export const updateEmployeeProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    const SECRET_KEY: any = process.env.JWT_SECRET;

    const decoded: any = jwt.verify(token, SECRET_KEY);

    if(!decoded) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }


    const employeeId = req.params.id;

    const {name, email, department} = req.body;
    const updateData = {
        name,
        email,
        department
    };

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No update data provided." });
      }

      const updatedEmployeeProfile = await EmployeeProfileModel.findByIdAndUpdate(
        employeeId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      await EmployeeModel.findByIdAndUpdate(
        employeeId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      return res.status(200).json({
        message: "Profile updated successfully.",
        data: updatedEmployeeProfile,
      });
    
    }catch (error) {
        return res.status(500).json({ message: "An error occurred while updating the employee." });
    }
}

export const deleteEmployeeProfile = async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
          return res.status(401).json({ message: "Access denied. No token provided." });
        }
    
        // Verify the token
        const SECRET_KEY: any = process.env.JWT_SECRET;
    
        const decoded: any = jwt.verify(token, SECRET_KEY);
    
        if(!decoded) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }
    
    
        const employeeId = decoded._id;

        await EmployeeProfileModel.findByIdAndDelete(employeeId)
        await EmployeeModel.findByIdAndDelete(employeeId)

        return res.status(200).json({
            message: 'employee data successfully deleted'
        })
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while deleting the employee." });
    }
}

export const fetchEmployeeStats = async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
          }

          const SECRET_KEY: any = process.env.JWT_SECRET;
    
          const decoded: any = jwt.verify(token, SECRET_KEY);

          if(!decoded) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }

        const totalNumberOfEmployees = await EmployeeProfileModel.countDocuments();

        const departmentStats = await EmployeeProfileModel.aggregate([
            {$group: {_id: "$department", count: {$sum: 1}}},
            {$project: { department: "$_id", count: 1, _id: 0}}
        ])

        return res.status(200).json({
            message: "Employee statistics fetched successfully.",
            totalNumberOfEmployees,
            departments: departmentStats,
          });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "An error occurred while fetching the statistics." });
    }
}