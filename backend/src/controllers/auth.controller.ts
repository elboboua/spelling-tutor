import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/connection";
import jwt from "jsonwebtoken";

export const signup: RequestHandler = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const userExists = await prisma.user.findUnique({ where: { email } });

        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // generate token with user id
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
        res.json({ jwt: token });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    // generate token with user id
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    res.json({ jwt: token });
};
