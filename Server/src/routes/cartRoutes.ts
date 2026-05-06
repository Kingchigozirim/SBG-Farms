import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/cart", authenticateToken, getCart);
router.post("/cart", authenticateToken, addToCart);
router.put("/cart", authenticateToken, updateCartItem);
router.delete("/cart", authenticateToken, clearCart);

export default router;
