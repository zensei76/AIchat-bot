import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// Middlewares
app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL2],
        credentials: true,
        // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    })
);

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Use Morgan only in development
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan("dev"));
}

// Routes
app.use("/api/v1", appRouter);

// Error handling middleware (if you have one)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;