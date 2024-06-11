import "reflect-metadata";
import express from "express";
import { config } from "dotenv";
import { AppDataSource } from "./config/ormconfig";
import { productRouter } from "./routes/productRoutes";
import { initializeApp } from "./utils/app";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/products", productRouter);

// Error handling middleware
app.use(errorHandler);

// Initialize database and start server
initializeApp(app, PORT, AppDataSource);
