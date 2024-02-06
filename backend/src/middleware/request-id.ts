import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

const addRequestId = (req: Request, res: Response, next: NextFunction) => {
    req.request_id = uuidv4(); // Assign a unique ID to each request
    next();
};

export default addRequestId;
