declare namespace Express {
    export interface Request {
        request_id: string;
        user_id: int;
        // logger winston.Logger;
        logger: import("winston").Logger;
    }
}
