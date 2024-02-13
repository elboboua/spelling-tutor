// authz middleware with express

import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/connection";

export const authz: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const [_, token] = parts;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);

        if (typeof payload !== "object" || !("userId" in payload)) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user_id = payload.userId!;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
};
