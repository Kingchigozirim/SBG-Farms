import express from "express";
import {
  createOrder,
  confirmPayment,
  getOrderById,
  getMyOrders,
} from "../controllers/orderController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { orderSchema } from "../utils/validationSchemas.js";

const router = express.Router();

router.post("/orders", authenticateToken, validateRequest(orderSchema), createOrder);
router.get("/verify-payment", confirmPayment);
router.get("/orders/me", authenticateToken, getMyOrders);
router.get("/orders/:id", authenticateToken, getOrderById);

export default router;
