import { RequestHandler } from "express";
import prisma from "../../prisma/connection";

export const getUser: RequestHandler = async (req, res) => {
    req.logger.info("Getting user information for user: " + req.user_id);
    try {
        const user = await prisma.user.findFirst({
            where: { id: req.user_id },
            select: { id: true, name: true, email: true },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
