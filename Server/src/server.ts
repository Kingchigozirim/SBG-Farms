import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import logger from "./utils/logger.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    logger.info("MongoDB connected successfully");

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`API docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
