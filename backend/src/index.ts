import express from "express";
import prisma from "../prisma/connection";

// Routers
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { authz } from "./middleware/authz.middleware";

// logging
import requestId from "./middleware/request-id";
import morgan from "morgan";
import { attachLoggerToRequest, logger } from "./middleware/logging.middleware";
import cors, { CorsOptions } from "cors";

const app = express();
const PORT = 8080;
const corsOptions: CorsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
};

app.use;
app.use(express.json());
app.use(requestId);
app.use(cors(corsOptions));
app.use(
    morgan(":id :method :url :response-time", {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);
app.use(attachLoggerToRequest);

app.get("/", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// Routes
app.use("/auth", authRoutes);
app.use("/user", authz, userRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
