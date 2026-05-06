import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFoundHandler = (
  req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
};
