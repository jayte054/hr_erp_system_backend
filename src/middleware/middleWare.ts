import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// export const authenticateAdmin = (req: Request, res: Response, next: NextFunction): any => {
//     // const token = req.header('Authorization')?.replace('Bearer ', '');
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ error: 'Access denied. No token provided.' });
//     }

//     try {
//         if (!process.env.JWT_SECRET) {
//             throw new Error('JWT_SECRET is not defined in environment variables');
//         }
        
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        
//         req.adminId = decoded.id; // Attach admin ID to request
//         next();
//     } catch (error) {
//         res.status(400).json({ error: 'Invalid token.' });
//     }
// };