import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { setupSwagger } from "./config/swagger.js";
import logger from "./utils/logger.js";

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:8080",
  credentials: true,
}));
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(morgan("combined", {
  stream: { write: (message) => logger.info(message.trim()) }
}));

app.use(apiLimiter);

setupSwagger(app);

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminRoutes);
app.use("/api", userRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "SBGFARMS API is running" });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
