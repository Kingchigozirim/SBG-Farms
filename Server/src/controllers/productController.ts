import Product from "../models/Product.js";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import logger from "../utils/logger.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;

    const query: any = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query)
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    logger.error("Error in getAllProducts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    logger.error("Error in getProductById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    logger.error("Error in createProduct:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    logger.error("Error in updateProduct:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    logger.error("Error in deleteProduct:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
