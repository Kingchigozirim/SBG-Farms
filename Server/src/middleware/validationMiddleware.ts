import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error,
      });
    }
  };
};
