import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticateToken, adminOnly } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { productSchema } from "../utils/validationSchemas.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

router.post(
  "/products",
  authenticateToken,
  adminOnly,
  validateRequest(productSchema),
  createProduct
);
router.put(
  "/products/:id",
  authenticateToken,
  adminOnly,
  updateProduct
);
router.delete(
  "/products/:id",
  authenticateToken,
  adminOnly,
  deleteProduct
);

export default router;
