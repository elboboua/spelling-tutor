import winston from "winston";
import morgan from "morgan";
import { Request, RequestHandler } from "express";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [new winston.transports.Console()],
});

// Add request ID to morgan
morgan.token("id", function getId(req: Request) {
    return req.request_id;
});

export const attachLoggerToRequest: RequestHandler = (req, _, next) => {
    req.logger = logger;
    next();
};
