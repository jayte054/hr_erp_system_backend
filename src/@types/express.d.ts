import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            adminId?: string | any; 
        }
    }
}